var engine = require("engine.io-stream/client")
var multilevel = require('multilevel');

var db = multilevel.client();
// attach to an engine.io server at url '/numbers'
var stream = engine("/numbers")
stream.pipe(db.createRpcStream()).pipe(stream);

// // and you can call the custom `foo` method!
// db.foo(function (err, res) {
//   console.log(res); // => "bar"
// });

window.db = db;
db.createReadStream().on('data', function (d) { console.log(d); });
