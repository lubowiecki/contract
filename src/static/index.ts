import { Notify } from '@lubowiecki/node-utility';
import express from 'express';

const app = express();

app.use('/files', express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/files'));

app.listen(4012);

Notify.info({
	message: 'Listening on: http://localhost:4012'
})
