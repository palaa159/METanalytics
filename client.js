// CLIENT
var client = {},
	moment = require('moment'),
	net = require('net'),
	colors = require('colors'),
	jsonSocket = require('json-socket'),
	host = '192.168.1.3',
	port = 3000,
	socket = new jsonSocket(new net.Socket()),
	fs = require('fs'),
	util = require('util');

client.filename = 'cap';

client.init = function() {
	// GREETING
	console.log('–– ANALI.FY'.rainbow.bold);
	console.log('––– ..'.rainbow.bold);
	console.log('–––– loading'.rainbow.bold);
	console.log('––––– CLIENT'.white.bold.underline);
	console.log('–––––– tracking you'.rainbow.bold);
	console.log('––––––– since 2014'.rainbow.bold);
	console.log('–––––––– thank you'.rainbow.bold);
	// END OF GREETING

	// socket connect
	socket.connect(port, host);
	socket.on('connect', function() {
		console.log('Connected to server ' + host.yellow);
		// send data
		socket.sendMessage({
			time: moment().format('MMMM Do YYYY, h:mm:ss a')
		});
	});

	// client.start();
};

client.start = function() {

	fs.readdir('./cap', function(err, files) {
		var csvlength = files.toString().match(/csv/g).length;
		console.log(csvlength);
		if (err) throw err;
		if (csvlength <= 9) {
			client.filePath = './cap/' + client.filename + '-0' + csvlength + '.csv';
			// console.log('file path: ' + client.filePath);
			client.processCSV(client.filePath);
		} else {
			client.filePath = './cap/' + client.filename + '-' + csvlength + '.csv';
			// console.log('file path: ' + client.filePath);
			// if(tmpUser.length > 0) { // start watching when has user register
			client.processCSV(client.filePath);
		}
	});
};

client.processCSV = function(path) {
	console.log('Monitoring ' + path.green.bold);
	fs.watchFile(path, function(curr, prev) {

		// fs.readFile(path, function() {
		// });
	});
};

client.normalize = function() {

};
client.init();