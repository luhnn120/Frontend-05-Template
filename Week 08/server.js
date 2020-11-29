const http = require("http");

http.createServer(function (request, response) {
  const chunks = [];
  request
    .on("error", (err) => console.error(err))
    .on("data", (chunk) => chunks.push(chunk))
    .on("end", () => {
      const body = Buffer.concat(chunks).toString();
      console.log("request body:", body);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("Hello, world\n");
    });
}).listen(8000);

console.log("server started");