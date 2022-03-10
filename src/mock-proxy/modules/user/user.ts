import http from 'http';

import { createReadStream, readFileSync, statSync } from 'fs-extra';
import { HttpAdapters, HttpRequestWithBody } from '@lubowiecki/node-utility';

import { userDtoOne } from './examples/user-dto-one';

const modifyResponse = require('node-http-proxy-json');

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
			const file = readFileSync('src/static/files/test.txt');

			proxyRes.headers['content-type'] = 'text/plain';

			modifyResponse(res, proxyRes, (body: any) => file.toString());
		}
	}
}
