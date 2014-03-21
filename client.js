var net = require('net'),
	moment = require('moment'),
	jsonSocket = require('json-socket'),
	host = '54.83.34.151',
	port = 443,
	socket = new jsonSocket(new net.Socket()),
	timeout,
	raspi = {},
	dns = require('dns'),
	dnsCheck,
	fs = require('fs');

// check internet connection every 1 minute

raspi.id = 'METLab';
raspi.filename = 'test';

raspi.connect = function() {
	console.log('connecting to ' + host + ':' + port);
	socket.connect(port, host);
};

raspi.reconnect = function() {
	timeout = setInterval(function() {
		raspi.connect();
	}, 10 * 1000);
};

raspi.start = function() {

	fs.readdir('/home/pi/METanalytics/cap', function(err, files) {
		var csvlength = files.toString().match(/csv/g).length;
		console.log(csvlength);
		if (err) throw err;
		if (csvlength <= 9) {
			raspi.filePath = '/home/pi/METanalytics/cap/' + raspi.filename + '-0' + csvlength + '.csv';
			console.log('file path: ' + raspi.filePath);
			raspi.processCSV(raspi.filePath);
		} else {
			raspi.filePath = '/home/pi/METanalytics/cap/' + raspi.filename + '-' + csvlength + '.csv';
			console.log('file path: ' + raspi.filePath);
			// if(tmpUser.length > 0) { // start watching when has user register
			raspi.processCSV(raspi.filePath);
		}
	});
};

raspi.processCSV = function(path) {
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
				id: raspi.id,
				timestamp: moment().unix(),
				devArray: raspi.deviceData(data)
			});
		});
	}
};

raspi.deviceData = function(data) {
	// check lastseen > unix now - offset
	var tmp = data.substring(data.indexOf('ESSIDs') + 8, data.length),
		tmpDevArray = tmp.match(/[^ ]\w\w[:]\w\w[:]\w\w[:]\w\w[:]\w\w[:]\w\w/g), // [^ ] = not space
		tmpSeenArray = tmp.match(/\d+[-]\d+[-]\d+\s\d+[:]\d+[:]\d+/g),
		devArray = [];

	// STRIP each devArray
	for (var i = 0; i < tmpDevArray.length; i++) {
		devArray.push({
			mac: tmpDevArray[i].substring(1),
			vendor: raspi.macToVendor(tmpDevArray[i].substring(1)),
			firstSeen: moment(tmpSeenArray[i * 2]).unix(),
			lastSeen: moment(tmpSeenArray[i * 2 + 1]).unix()
		});
	}
	return devArray;
};

raspi.macToVendor = function(mac) {
	return true;
};

raspi.countAllRouter = function(data) {
	var tmp = data.substring(data.indexOf('key') + 5, data.indexOf('ESSIDs') - 5);
	return tmp.match(/\n/g).length - 2;
};

raspi.countAllOnlineDevice = function(data) {
	var tmp = data.substring(data.indexOf('ESSIDs') + 8, data.length);
	return tmp.match(/\n/g).length - 1;
};

raspi.normalize = function() {

};

socket.on('connect', function() {
	// remove timeout
	clearInterval(timeout);
	console.log('connected to ' + host + ':' + port);
	socket.sendMessage({
		command: 'time',
		time: moment().format('MMMM Do YYYY, h:mm:ss a')
	}, function() {
		console.log('............. sending time to server');
	});
	raspi.start();
});

socket.on('error', function(err) {
	console.log(err);
	// reconnect
	raspi.reconnect();
});

socket.on('end', function() {
	console.log('connection dropped');
	clearInterval(timeout);
	// when disconnect, set a 5 seconds interval
	raspi.reconnect();
});

raspi.connect();
