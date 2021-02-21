let http = require('http')
let fs = require("fs")
let archive = require("archiver")

let request = http.request({
  hostname: '127.0.0.1',
  port: 8082,
  method: 'POST',
  headers: {
    'Content-type': 'application/octet-stream',
  }
}, response => {
  console.log(response)
})
const archiver = archive('zip', {
  zlib: {level: 9}
})
archiver.directory('./sample', false)
archiver.finalize()
archiver.pipe(request)
