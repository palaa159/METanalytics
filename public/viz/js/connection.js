var socket = io.connect();
socket.on('init', function(data) {
	console.log(data.msg);
});

socket.on('minute', function(data) {
	console.log('from ' + data.id + ' at ' + moment(data.timestamp).format('h:mm:ss a'));
	console.log('unique device from ' +  moment(data.timestamp - 60).format('h:mm:ss a') + ' - ' + moment(data.timestamp).format('h:mm:ss a') + ' = ' + data.devArray.length);
	console.log(data.devArray);
});