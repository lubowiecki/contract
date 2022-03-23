import { createServer } from 'http';

import { Server, Socket } from 'socket.io';
import { Notify } from '@lubowiecki/node-utility';

import { User } from './modules/user/user';
import { WebSocketEventsMap } from './web-socket-events-map';

const server = createServer();

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:4201',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

const user = new User();

io.of('/v1').on('connection', (socket: Socket<WebSocketEventsMap>) => {
	Notify.info({ message: `Connected with token: ${socket.handshake.auth.token}` });

	user.init(socket);

	socket.on(
		'disconnect',
		() => Notify.info({ message: 'Closed' }),
	);
});

server.listen(
	8080,
	() => Notify.success({ message: 'WebSocket server on: ws://localhost:8080/v1' }),
);
