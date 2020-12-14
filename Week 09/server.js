const http = require('http');

const server = http.createServer(function(request,response) {
  let body = []
  request
  .on('error', function(error) {
    console.log(error) 
    response.end('error\n');
  })
  .on('data', function(chunk) {
    body.push(chunk)
  })
  .on('end', function(){
    body = Buffer.concat(body).toString();
    console.log(body)
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(`
      <html maaa=a >
            <head>
                <style>
                    body div #myid{
                        width:100px;
                        background-color: #ff5000;
                        height: 100px;
                    }
                    body div img{
                        width:30px;
                        background-color: #ff1111;
                        height: 100px;
                    }
                    .title {
                      color: red
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1 class='title'>测试</h1>
                    <img id="myid" />
                    <img />
                </div>
            </body>
    `);
  })
}).listen(8001)

server.on('request', (req,resp) => {
  console.log(req)  
})

server.on('clientError', (err, socket) => {
  console.log(err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

console.log("server started");

