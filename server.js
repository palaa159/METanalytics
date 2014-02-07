// SERVER
var server = {},
	u = require('util'),
	moment = require('moment'),
	net = require('net'),
	colors = require('colors'),
	jsonSocket = require('json-socket'),
	port = 8080,
	server = net.createServer(),
	fs = require('fs'),
	util = require('util');

server.init = function() {
	// GREETING
	u.log('–– ANALI.FY'.rainbow.bold);
	u.log('––– ..'.rainbow.bold);
	u.log('–––– loading'.rainbow.bold);
	u.log('––––– SERVER'.white.bold.underline);
	u.log('–––––– tracking you'.rainbow.bold);
	u.log('––––––– since 2014'.rainbow.bold);
	u.log('–––––––– thank you'.rainbow.bold);
	// END OF GREETING

	server.start();
};

server.start = function() {
	server.listen(port);
	u.log('@@@@@@@@@@@@@@@@@@@@'.yellow);
	u.log('@ SERVER LISTENING @'.yellow);
	u.log('@   ON PORT '.yellow + port + '   @'.yellow);
	u.log('@@@@@@@@@@@@@@@@@@@@'.yellow);

	server.on('connection', function(socket) {
		u.log('A socket has connected');
		socket = new jsonSocket(socket);
		socket.on('message', function(data) {
			if (data.command === 'everyminute') {
				u.log('tick! from '.white + data.id);
				server.process(data.timestamp, data.devArray);
			}
		});
	});
};

server.process = function(time, devarray) {
	var devArray = [];
	devarray.forEach(function(v) {
		if (v.lastSeen + 60 + 10 >= time) {
			devArray.push({
				mac: v.mac,
				lastSeen: v.lastSeen
			});
		}
	});
	u.log(devArray);
};
//==================================
//
// MISC
// EXPRESS, SOCKET.IO, MONGOOSE
//
//==================================
var express = require('express'),
	app = express(),
	http = require('http'),
	httpServer = http.createServer(app), // bc of socket.io
	webPort = 80;

// app.use(express.logger());
app.use(express.static(__dirname + '/public'));

app.get(/^(.+)$/, function(req, res) {
	u.log(('static file request : ' + req.params).yellow);
	res.sendfile(req.params[0]);
});

// SOCKET.IO
var io = require('socket.io').listen(app.listen(webPort, function() {
	u.log(('Express listening on ' + webPort).green);
}), {
	log: false
});

io.sockets.on('connection', function() {
	u.log('hello client');
});

// MONGO driver by Mongoose
var Mongoose = require('mongoose'),
	opts = { server: { auto_reconnect: true }, user: 'root', pass: 'bitnami' };

server.connectDb = function() {
	db = Mongoose.createConnection('mongodb:///opt/bitnami/mongodb/tmp/mongodb-27017.sock/met');
};

//==================================
//
// PCAP
// FOR DEVICE REGISTRATION
//
//==================================



// =======================
// INITIALIZE
// =======================
// server.connectDb();
server.init();