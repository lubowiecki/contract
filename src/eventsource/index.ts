import { Notify } from '@lubowiecki/node-utility';
import express from 'express';

const app = express();

function sednEvery5Sec(res: any): void {
	res.write(`data: Message from EventSource ${Math.random()}\n\n`);

	setTimeout(() => sednEvery5Sec(res), 5000);
}

app.get('/v1', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	sednEvery5Sec(res);
});

app.listen(
	8081,
	() => Notify.success({ message: 'EventSource server on: http://localhost:8081/v1' }),
);
