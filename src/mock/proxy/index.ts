import http from 'http';

import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { HttpAdapters, HttpRequestWithBody } from '@opi_pib/node-utility';

import { User } from './modules/user/user';

type OnProxyReqCallbackExtended = (proxyReq: http.ClientRequest, req: any, res: http.ServerResponse) => void;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const user = new User();

const proxyOptions: Options = {
	target: 'http://127.0.0.1:4010',
	changeOrigin: true,
	onProxyReq: function (proxyReq: http.ClientRequest, req: HttpRequestWithBody, res: http.ServerResponse) {
		user.processReq(proxyReq, req, res);

		HttpAdapters.writeParsedBody(proxyReq, req);
	} as OnProxyReqCallbackExtended,
	onProxyRes(proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse) {
		user.processRes(proxyRes, req, res);
	},
};

app.use('/', createProxyMiddleware(proxyOptions));

app.listen(4011);
