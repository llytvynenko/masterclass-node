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
var memdown = require('memdown');
server.listen(process.env.PORT || 3000);

var db = levelup('/messages', {db: memdown});
// 3: sockets

var multilevel = require('multilevel');
multilevel.writeManifest(db, __dirname + '/manifest.json');

var engine = EngineServer(function(stream) {
    stream.pipe(multilevel.server(db)).pipe(stream);
});

 var level = require('level')

 level('/tmp/level-live-stream',
   {createIfMissing: true}, function (err, db) {

   var liveStream = require('level-live-stream')(db)

   liveStream
     .on('data', console.log)

   setInterval(function () {
     db.put('time', new Date().toString())

   }, 1000)

 })

var stream = engine.attach(server, "/numbers")
