// CLIENT
var app = {},
	moment = require('moment'),
	net = require('net'),
	colors = require('colors'),
	socket = require('json-socket'),
	fs = require('fs'),
	util = require('util');

app.init = function() {
	// GREETING
	console.log('–– ANALI.FY'.rainbow.bold);
	console.log('––– ..'.rainbow.bold);
	console.log('–––– loading'.rainbow.bold);
	console.log('––––– client'.rainbow.bold);
	console.log('–––––– tracking you'.rainbow.bold);
	console.log('––––––– since 2014'.rainbow.bold);
	console.log('–––––––– thank you'.rainbow.bold);
	// END OF GREETING

	// app.start();
};

app.start = function() {
	fs.readdir('./cap', function(err, files) {
		var csvlength = files.toString().match(/csv/g).length;
		console.log(csvlength);
		if (err) throw err;
		if (csvlength <= 9) {
			app.filePath = './cap/' + filename + '-0' + csvlength + '.csv';
			// console.log('file path: ' + app.filePath);
			app.processCSV(app.filePath);
		} else {
			app.filePath = './cap/' + filename + '-' + csvlength + '.csv';
			// console.log('file path: ' + app.filePath);
			// if(tmpUser.length > 0) { // start watching when has user register
			app.processCSV(app.filePath);
		}
	});
};

app.processCSV = function(path) {
	console.log('Monitoring ' + path.green.bold);
	fs.watchFile(path, function(curr, prev) {
		fs.readFile(path, function() {
			
		});
	});
};

app.normalize = function() {

};
app.init();