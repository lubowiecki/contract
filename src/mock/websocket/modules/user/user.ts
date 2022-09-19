import { Notify } from '@opi_pib/node-utility';
import { Socket } from 'socket.io';

import { WebSocketEventsMap } from '../../web-socket-events-map';
import { userCreated } from './examples/user-created';
import { webSocketEvents } from '../../web-socket-events';

function sendEvery5Sec(socket: any): void {
	socket.emit('user:created', JSON.stringify(userCreated));

	setTimeout(() => sendEvery5Sec(socket), 5000);
}

export class User {
	init(socket: Socket<WebSocketEventsMap>): void {
		sendEvery5Sec(socket);

		socket.on(
			webSocketEvents.UserCreate,
			(message) => {
				Notify.info({ message: `Received user:create: ${message}` });

				socket.emit('user:created', JSON.stringify(userCreated));
			},
		);

		socket.on(
			webSocketEvents.UserUpdate,
			(message) => Notify.info({ message: `Received user:update: ${message}` }),
		);
	}
}
