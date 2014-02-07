var socket = io.connect();
socket.on('init', function(data) {
	console.log(data.msg);
});

socket.on('minute', function(data) {
	console.log('from ' + data.id + ' at ' + data.timestamp);
	console.log('unique device from ' +  data.timestamp + ' = ' + data.devArray.length);
	console.log(data.devArray);
});