// CLIENT
var client = {},
	moment = require('moment'),
	net = require('net'),
	colors = require('colors'),
	jsonSocket = require('json-socket'),
	host = '54.80.86.109',
	port = 3000,
	socket = new jsonSocket(new net.Socket()),
	fs = require('fs'),
	util = require('util');

// socket global listener
	// error handling
	socket.on('error', function(err) {
		// console.log(err);
		if(err.code == 'ECONNREFUSED')
			console.log(('Attempting to connect to ' + host + ' port ' + port).red);
			setTimeout(function() {
				socket.connect(port, host);
			}, 5000);
	});

client.id = 'A001';
client.filename = 'test';
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
		client.start();
	});
};

client.start = function() {

	fs.readdir('./cap', function(err, files) {
		var csvlength = files.toString().match(/csv/g).length;
		console.log(csvlength);
		if (err) throw err;
		if (csvlength <= 9) {
			client.filePath = './cap/' + client.filename + '-0' + csvlength + '.csv';
			console.log('file path: ' + client.filePath);
			client.processCSV(client.filePath);
		} else {
			client.filePath = './cap/' + client.filename + '-' + csvlength + '.csv';
			console.log('file path: ' + client.filePath);
			// if(tmpUser.length > 0) { // start watching when has user register
			client.processCSV(client.filePath);
		}
	});
};

client.processCSV = function(path) {
	console.log('Monitoring ' + path.green.bold);
	// starting clock
	var clock = setInterval(function() {
		if (moment().format('ss') == '00') {
			console.log('sendData at ' + moment().format('h:mm:ss a'));
			sendData();
		}
	}, 1000);

	function sendData() {
		fs.readFile(path, function(err, buffer) {
			var data = buffer.toString();
			socket.sendMessage({
				command: 'everyminute',
				id: client.id,
				timestamp: moment().unix(),
				devArray: client.deviceData(data)
			});
		});
	}
};

client.deviceData = function(data) {
	// check lastseen > unix now - offset
	var tmp = data.substring(data.indexOf('ESSIDs') + 8, data.length),
		tmpDevArray = tmp.match(/[^ ]\w\w[:]\w\w[:]\w\w[:]\w\w[:]\w\w[:]\w\w/g), // [^ ] = not space
		tmpSeenArray = tmp.match(/\d+[-]\d+[-]\d+\s\d+[:]\d+[:]\d+/g),
		devArray = [];

	// STRIP each devArray
	for(var i = 0; i < tmpDevArray.length; i++) {
		devArray.push({
			mac: tmpDevArray[i].substring(1),
			vendor: client.macToVendor(tmpDevArray[i].substring(1)),
			firstSeen: moment(tmpSeenArray[i*2]).unix(),
			lastSeen: moment(tmpSeenArray[i*2 + 1]).unix()
		});
	}
	return devArray;
};

client.macToVendor = function(mac) {
	return true;
};

client.countAllRouter = function(data) {
	var tmp = data.substring(data.indexOf('key') + 5, data.indexOf('ESSIDs') - 5);
	return tmp.match(/\n/g).length - 2;
};

client.countAllOnlineDevice = function(data) {
	var tmp = data.substring(data.indexOf('ESSIDs') + 8, data.length);
	return tmp.match(/\n/g).length - 1;
};

client.normalize = function() {

};

client.init();
