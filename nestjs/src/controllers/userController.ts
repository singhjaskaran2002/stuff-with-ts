import express from 'express';

import { errorMessages } from '../constants/messages';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { users } from '../fakeData/users';

interface IRequest extends Request {
	userId: number | string;
}

function RouterMiddleware(
	req: IRequest,
	_: express.Response,
	next: express.NextFunction
) {
	req.userId = 2;
	console.log('this is router middleware.');
	next();
}

function ClassMiddleware(
	_: IRequest,
	__: express.Response,
	next: express.NextFunction
) {
	console.log('this is class middleware');
	next();
}

@Controller('/users', [ClassMiddleware])
export class UserController {
	@Route('get', '/', [RouterMiddleware])
	static getAllUsers(req: IRequest, res: express.Response) {
		console.log(req.userId);
		res.json(users);
	}

	@Route('get', '/:id')
	static getUserById(req: express.Request, res: express.Response) {
		const userId = +req.params.id;
		const user = users.find((item) => item.id === userId);
		if (!user) return res.status(404).json(errorMessages.USER_NOT_FOUND);
		res.json(user);
	}
}
