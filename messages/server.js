var http = require('http');
var browserify = require('browserify');

var EngineServer = require("engine.io-stream");
// 1: http
var server = http.createServer(function (req, res) {
  if (req.url == '/') {
    res.end('<body><div id="container" /><script src="bundle.js"></script></body>');
  }
  else if (req.url == '/bundle.js') {
    var b = browserify();

    b.add('./browser.js');
    b.bundle().pipe(res);
  }
  else {
    res.end('oops!')
  }
});

// 2: db
var levelup = require('levelup');
var memdoen = require('memdoen');
var db = levelup('/messages', {db: memdoen});


// 3: sockets

var multilevel = require('multilevel');

// now write the manifest to a file
multilevel.writeManifest(db, __dirname + '/manifest.json');

var engine = EngineServer(function(stream) {
    stream.pipe(multilevel.server(db)).pipe(stream);
});
 //

var stream = engine.attach(server, "/numbers")

server.listen(3000, function() {
    console.log("Listening on port 8080")
})
