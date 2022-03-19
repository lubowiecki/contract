import { createServer } from 'http';

import { Server, Socket } from 'socket.io';
import { Notify } from '@lubowiecki/node-utility';

enum WsResponseType {
	newData = 'newData'
}

function sednEvery5Sec(socket: Socket): void {
	const data = {
		type: WsResponseType.newData,
		message: `New data: ${Math.random()}`,
	};

	socket.send(JSON.stringify(data));

	setTimeout(() => sednEvery5Sec(socket), 5000);
}

const server = createServer();

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:4201',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

io.of('/v1').on('connection', (socket) => {
	Notify.info({ message: `Connected with token: ${socket.handshake.auth.token}` });

	socket.on(
		'user:create',
		(message) => Notify.info({ message: `Received create: ${message}` }),
	);

	socket.on(
		'user:update',
		(message) => Notify.info({ message: `Received update: ${message}` }),
	);

	socket.on(
		'disconnect',
		() => Notify.info({ message: 'Closed' }),
	);

	sednEvery5Sec(socket);
});

server.listen(
	8080,
	() => Notify.success({ message: 'WebSocket server on: ws://localhost:8080/v1' }),
);
