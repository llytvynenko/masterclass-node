require('babel/register');

var express = require('express');

var server = express();
var app = require('./app');

// logging
// config

server.use('/', app)
var http = require('http');
var port = process.evn.PORT || 3000;

http.createServer(server).listen(port, function () {
  console.log('server is UP!!')
})
// errror handling
