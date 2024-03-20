import express from 'express';
import {
	HttpProxyMiddleware,
	Notify,
	ProxyOptions,
} from '@opi_pib/node-utility';

import { User } from './modules/user/user';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const user = new User();

const proxyOptions: ProxyOptions = {
	target: 'http://127.0.0.1:4010',
	changeOrigin: true,
	onProxyReq(proxyReq, req, res, options) {
		user.processReq(proxyReq, req, res, options);

		HttpProxyMiddleware.writeParsedBody(proxyReq, req);
	},
	onProxyRes(proxyRes, req, res) {
		user.processRes(proxyRes, req, res);
	},
};

app.use('/', HttpProxyMiddleware.create(proxyOptions));

app.listen(4011, () => {
	Notify.success({ message: '[Server]: created at http://localhost:4011' });
});
