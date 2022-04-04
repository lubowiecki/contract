import { WebSocketEventType } from '../dtos/models/web-socket-event-type';

export type WebSocketEventsMap = {
	[event in WebSocketEventType]: (...args: any[]) => void
}
