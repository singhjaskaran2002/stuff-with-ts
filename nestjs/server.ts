import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';
import { errorMessages } from './src/constants/messages';

export const app = express();
app.use(bodyParser.json());

// import all controllers here
import './src/controllers/userController';

app.use('*', (_: express.Request, res: express.Response) => {
	res.status(404).json(errorMessages.ROUTE_NOT_FOUND);
});

app.listen(8000, () => console.log('Server started at http://localhost:8000'));
