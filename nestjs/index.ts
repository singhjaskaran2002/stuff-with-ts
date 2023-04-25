import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';

export const app = express();
app.use(bodyParser.json());

// import all controllers here
import './src/controllers/userController';

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
