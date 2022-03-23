/* tslint:disable */
/* eslint-disable */
export type WebSocketEventType =
  | 'user:create'
  | 'user:created'
  | 'user:update'
;

export const WebSocketEventType = {
  UserCreate: 'user:create' as WebSocketEventType,
  UserCreated: 'user:created' as WebSocketEventType,
  UserUpdate: 'user:update' as WebSocketEventType
};
