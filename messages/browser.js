var engine = require("engine.io-stream/client")
var multilevel = require('multilevel');

var db = multilevel.client();
LiveStream.install(db);

window.db = db;
db.liveStream().on('data', console.dir );
