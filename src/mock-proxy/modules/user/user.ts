import http from 'http';

import { HttpAdapters, HttpRequestWithBody } from '@lubowiecki/node-utility';

import { userDtoOne } from './examples/user-dto-one';

export class User {
	processReq(proxyReq: http.ClientRequest, req: HttpRequestWithBody, res: http.ServerResponse): void {}

	processRes(proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse): void {
		if (req.url?.match(`^/user/id/${userDtoOne.id}`) && req.method === 'GET') {
			HttpAdapters.replaceResponseBody(userDtoOne, proxyRes, res);
		}

		if (req.url?.match(`^/user/id/${userDtoOne.id}`) && req.method === 'PUT') {
			HttpAdapters.replaceResponseBody(userDtoOne, proxyRes, res);
		}
	}
}
