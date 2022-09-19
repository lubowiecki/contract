import { Notify } from '@opi_pib/node-utility';
import express from 'express';

const app = express();

app.use('/v1', express.static(`${__dirname}/files`));

app.listen(8082);

Notify.success({
	message: 'Static files server on: http://localhost:8082/v1',
});
