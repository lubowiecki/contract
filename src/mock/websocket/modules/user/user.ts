import { Notify } from '@lubowiecki/node-utility';
import { Socket } from 'socket.io';

import { WebSocketEventsMap } from '../../web-socket-events-map';
import { userCreated } from './examples/user-created';
import { webSocketEvents } from '../../web-socket-events';

export class User {
	init(socket: Socket<WebSocketEventsMap>): void {
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
