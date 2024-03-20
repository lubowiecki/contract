import {
	HttpAdapters,
	ProxyRequest,
	ClientRequest,
	IncomingMessage,
	ServerOptions,
	ServerResponse,
} from '@opi_pib/node-utility';

import { userDtoOne } from './examples/user-dto-one';

export class User {
	processReq(
		proxyReq: ClientRequest,
		req: IncomingMessage,
		res: ServerResponse,
		options: ServerOptions,
	): void {}

	processRes(
		proxyRes: IncomingMessage,
		req: ProxyRequest,
		res: ServerResponse,
	): void {
		if (req._parsedUrl?.pathname.match('^/user$') && req.method === 'GET') {
			const userId = req.query?.userId;

			if (userId === userDtoOne.id) {
				HttpAdapters.replaceResponseBody(userDtoOne, proxyRes, res);
			}
		}

		if (req._parsedUrl?.pathname.match('^/user$') && req.method === 'PUT') {
			const userId = req.query?.userId;

			if (userId === userDtoOne.id) {
				HttpAdapters.replaceResponseBody(userDtoOne, proxyRes, res);
			}
		}

		if (
			req._parsedUrl?.pathname.match('^/user/cv$') &&
			req.method === 'GET'
		) {
			const userId = req.query?.userId;

			if (userId === userDtoOne.id) {
				HttpAdapters.replaceResponseBodyFromFile(
					'src/mock/static/files/test.pdf',
					proxyRes,
					res,
				);
			}
		}
	}
}
