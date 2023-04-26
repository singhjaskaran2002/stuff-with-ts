import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';

import cookieParser from 'cookie-parser';

import { errorMessages } from './constants/messages';

export const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

import './controllers/userController';

app.use('*', (_: express.Request, res: express.Response) => {
	res.status(404).json(errorMessages.ROUTE_NOT_FOUND);
});
