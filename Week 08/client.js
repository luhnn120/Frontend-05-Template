const net = require('net');
// 设计http请求类
class Request{
  constructor(options){
    this.method = options.method || 'GET';
    this.host = options.host;
    this.path = options.path || '/';
    this.port = options.port || '80';
    this.header = options.header || {};
    // 处理Content-Type
    if(!this.header['Content-Type']){
      this.header['Content-Type'] = 'application/json'
    }
    // 针对不同Content-Type 处理body
    const type = this.header['Content-Type']
    if(type === 'application/json'){
      this.bodyText = JSON.stringify(options.body);
    }else if(type === 'application/x-www-form-urlencoded'){
      this.bodyText = Object.keys(options.body).map(el => `${el}=${encodeURIComponent(options.body[el])}`).join('&')
    }

    // Content-Length
    this.header['Content-Length'] = this.bodyText.length
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.header).map(el => `${el}: ${this.header[el]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
  }

  send(connection){
    return new Promise((resolve,reject) => {
      let parser = new ResponseParser()
      if(connection){
        connection.write(this.toString())
      }else{
        connection = net.createConnection({
          port: this.port,
          host: this.host,
        }, ()=>{
          connection.write(this.toString())
        })
      }
      connection.on('data', (data) => {
        console.log(data.toString())
        parser.receive(data.toString());
        if(parser.isFinished){
          connection.end();
          resolve(parser.response);
        }
      })
      connection.on('error', (err) =>{
        reject(err)
      })
    })
  }
}

class ResponseParser{
  constructor(){
    // 状态机状态声明
    // status line
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    // head
    this.WAITING_HEAD_NAME = 2
    this.WAITING_HEAD_NAME_END = 3
    this.WAITING_HEAD_VALUE = 4
    this.WAITING_HEAD_VALUE_END = 5
    // headblock
    this.WAITING_HEAD_BLOCK_END = 6
    // body
    this.WAITING_BODY = 7
    this.statusLine = ""
    this.headName = ""
    this.headValue = ""
    this.headers = {}
    this.bodyParser = null
    this.status = this.WAITING_STATUS_LINE;
  }
  get isFinished(){
    return this.bodyParser && this.bodyParser.isFinished
  }
  get response(){
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(s){
    for(let i=0; i < s.length; i++){
      this.receiveChar(s.charAt(i))
    }
  }
  receiveChar(c){
    if(this.status === this.WAITING_STATUS_LINE){
      if( c === '\r'){
        this.status = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += c;
      }
    }
    if( this.status === this.WAITING_STATUS_LINE_END){
      if( c === '\n'){
        this.status = this.WAITING_HEAD_NAME;
        // 防止\n 添加到headname上
        return void 0
      }
    }
    if( this.status === this.WAITING_HEAD_NAME){
      if( c === ':')
        this.status = this.WAITING_HEAD_NAME_END
      else if ( c === '\r'){
        this.status = this.WAITING_HEAD_BLOCK_END
        if(this.headers['Transfer-Encoding'] === 'chunked')
          this.bodyParser = new ChunkedBodyParser()
      }
      else 
        this.headName += c
    }
    if( this.status === this.WAITING_HEAD_NAME_END){
      if(c === ' '){
        this.status = this.WAITING_HEAD_VALUE
        // 阻止' ' 被添加到headValue上
        return void 0
      }
    }
    if(this.status === this.WAITING_HEAD_VALUE){
      if(c === '\r')
        this.status = this.WAITING_HEAD_VALUE_END
      else 
        this.headValue += c
    }
    if( this.status === this.WAITING_HEAD_VALUE_END ){
      if(c === '\n'){
        this.status = this.WAITING_HEAD_NAME
        this.headers[this.headName] = this.headValue
        this.headName = ""
        this.headValue = ""
      }
    }
    if(this.status === this.WAITING_HEAD_BLOCK_END){
      if( c === '\n'){
        this.status = this.WAITING_BODY
        // 防止添加到body上
        return void 0
      }
    }
    if(this.status === this.WAITING_BODY){
      this.bodyParser.receiveChar(c)
    }
  }
}

class ChunkedBodyParser{
  constructor(){
    // 长度
    this.WAITING_HEAD_LINE = 0
    this.WAITING_HEAD_LINE_END = 1
    this.READING_BODY = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    this.status = this.WAITING_HEAD_LINE
    this.isFinished = false
  }
  receiveChar(c){
    if(this.status === this.WAITING_HEAD_LINE){
      if(c === '\r'){
        this.status = this.WAITING_HEAD_LINE_END
        if(this.length === 0)
          this.isFinished = true
      }else{
        this.length *= 16
        this.length += parseInt(c, 16)
      }
    }
    if(this.status === this.WAITING_HEAD_LINE_END){
      if(c === '\n'){
        this.status = this.READING_BODY
        return void 0
      }
    }
    if(this.status === this.READING_BODY){
      // 处理结尾0
      if(this.length === 0){
        this.status = this.WAITING_NEW_LINE
        return void 0
      }
      this.content.push(c)
      this.length--
      if(this.length === 0){
        this.status = this.WAITING_NEW_LINE
      }
    }
    if(this.status === this.WAITING_NEW_LINE){
      if(c === '\r')
        this.status = this.WAITING_NEW_LINE_END
    }
    if(this.status === this.WAITING_NEW_LINE){
      if(c === '\n')
        this.status = this.WAITING_HEAD_LINE
    }
  }
}

// TEST
void async function(){
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8001',
    header: {
      ['X-Foo2']: 'customer'
    },
    body: {
      name: 'luhnn',
      age: '25',
      sex: 'male',
    },
  });
  let response = await request.send();
  console.log(response)
}();