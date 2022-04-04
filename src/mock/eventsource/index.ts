import { Notify } from '@lubowiecki/node-utility';
import express from 'express';

const app = express();

function sendEvery5Sec(res: any): void {
	res.write(`data: Message from EventSource ${Math.random()}\n\n`);

	setTimeout(() => sendEvery5Sec(res), 5000);
}

app.get('/v1', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	sendEvery5Sec(res);
});

app.listen(
	8081,
	() => Notify.success({ message: 'EventSource server on: http://localhost:8081/v1' }),
);
