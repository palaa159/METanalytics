// SERVER
var server = {},
	moment = require('moment'),
	net = require('net'),
	colors = require('colors'),
	jsonSocket = require('json-socket'),
	port = 3000,
	server = net.createServer(),
	fs = require('fs'),
	util = require('util');

server.init = function() {
	// GREETING
	console.log('–– ANALI.FY'.rainbow.bold);
	console.log('––– ..'.rainbow.bold);
	console.log('–––– loading'.rainbow.bold);
	console.log('––––– SERVER'.white.bold.underline);
	console.log('–––––– tracking you'.rainbow.bold);
	console.log('––––––– since 2014'.rainbow.bold);
	console.log('–––––––– thank you'.rainbow.bold);
	// END OF GREETING

	server.start();
};

server.start = function() {
	server.listen(port);
	console.log('@@@@@@@@@@@@@@@@@@@@'.yellow);
	console.log('@ SERVER LISTENING @'.yellow);
	console.log('@   ON PORT '.yellow + port + '   @'.yellow);
	console.log('@@@@@@@@@@@@@@@@@@@@'.yellow);

	server.on('connection', function(socket) {
		console.log('A socket has connected');
		socket = new jsonSocket(socket);
		socket.on('message', function(data) {
			if(data.command == 'everyminute') {
				console.log('tick! from '.white + data.id);
				server.process(data.timestamp, data.devArray);
			}
		});
	});
};

server.process = function(time, devarray) {
	var devArray = [];
	devarray.forEach(function(v) {
		if(v.lastSeen + 60 + 10 >= time) {
			devArray.push({
				mac: v.mac,
				lastSeen: v.lastSeen
			});
		}
	});
	console.log(devArray);
};

server.init();