var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app);

server.listen(80);
app.use(express.static(__dirname + "/public"));
