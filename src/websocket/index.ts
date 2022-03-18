import { createServer } from 'http';

import WebSocket, { WebSocketServer } from 'ws';
import { Notify } from '@lubowiecki/node-utility';

enum WsResponseType {
	newData = 'newData'
}

function sednEvery5Sec(ws: WebSocket): void {
	const data = {
		type: WsResponseType.newData,
		message: `New data: ${Math.random()}`,
	};

	ws.send(JSON.stringify(data));

	setTimeout(() => sednEvery5Sec(ws), 5000);
}

const server = createServer();

const wss = new WebSocketServer({
	noServer: true,
});

wss.on('connection', (ws) => {
	Notify.info({ message: 'Connected' });

	ws.on(
		'message',
		(message) => Notify.info({ message: `Received: ${message}` }),
	);

	ws.on(
		'close',
		() => Notify.info({ message: 'Closed' }),
	);

	sednEvery5Sec(ws);
});

server.on('upgrade', (request, socket, head) => {
	if (request.url === '/v1') {
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request);
		});
	} else {
		socket.destroy();
	}
});

server.listen(
	8080,
	() => Notify.success({ message: 'WebSocket server on: ws://localhost:8080/v1' }),
);
