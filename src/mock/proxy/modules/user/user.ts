import http from 'http';

import { readFileSync } from 'fs-extra';
import { HttpAdapters, HttpRequestWithBody } from '@lubowiecki/node-utility';

import { userDtoOne } from './examples/user-dto-one';

export class User {
	processReq(proxyReq: http.ClientRequest, req: HttpRequestWithBody, res: http.ServerResponse): void {}

	processRes(proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse): void {
		if (req.url?.match(`^/user/${userDtoOne.id}`) && req.method === 'GET') {
			HttpAdapters.replaceResponseBody(userDtoOne, proxyRes, res);
		}

		if (req.url?.match(`^/user/${userDtoOne.id}`) && req.method === 'PUT') {
			HttpAdapters.replaceResponseBody(userDtoOne, proxyRes, res);
		}

		if (req.url?.match(`^/user/cv/${userDtoOne.id}`) && req.method === 'GET') {
			const file = readFileSync('src/mock/static/files/test.pdf');

			proxyRes.headers['content-length'] = `${file.byteLength}`;

			res.writeHead(200, 'OK', proxyRes.headers);
			res.write(file);
		}
	}
}
