const WebSocket = require('ws');
const port = 7071
const wss = new WebSocket.Server({port});

console.log('Run Websocket on port ', port)

wss.on('connection', function connection(ws) {
	console.log('Connection successful')
	ws.on('message', function message(data) {
		ws.send(data.toString());
	});
});

