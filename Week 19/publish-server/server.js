let http = require('http')
let unzipper = require('unzipper')

http.createServer(function(request, response){
  console.log("request")
  request.pipe(unzipper.Extract({ path: '../server/public/'}))
}).listen(8082)