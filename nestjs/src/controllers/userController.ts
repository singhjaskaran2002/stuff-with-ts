import express from 'express';

import { errorMessages, successMessages } from '../constants/messages';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { users } from '../fakeData/users';

interface IRequest extends Request {
	userId: number | string;
	authenticated: boolean;
	cookies: {
		token: string;
	};
}

class Middlewares {
	private constructor() {}

	static RouterMiddleware(
		_: IRequest,
		__: express.Response,
		next: express.NextFunction
	) {
		console.log('this is router middleware.');
		next();
	}

	static ClassMiddleware(
		_: IRequest,
		__: express.Response,
		next: express.NextFunction
	) {
		console.log('this is class middleware');
		next();
	}

	static VerifyTokenMiddleware(
		req: IRequest,
		res: express.Response,
		next: express.NextFunction
	) {
		if (!req.cookies.token) {
			return res.status(401).json(errorMessages.UNAUTHORIZED);
		}
		req.authenticated = true;
		next();
	}
}

@Controller('/users', [Middlewares.ClassMiddleware])
export class UserController {
	@Route('get', '/login')
	static login(_: IRequest, res: express.Response) {
		res.cookie('token', 'secret-token', { maxAge: 30000 }).json(
			successMessages.LOGGED_IN
		);
	}

	@Route('get', '/', [Middlewares.VerifyTokenMiddleware])
	static getAllUsers(_: IRequest, res: express.Response) {
		res.json(users);
	}

	@Route('get', '/:id', [Middlewares.VerifyTokenMiddleware])
	static getUserById(req: express.Request, res: express.Response) {
		const userId = +req.params.id;
		const user = users.find((item) => item.id === userId);
		if (!user) return res.status(404).json(errorMessages.USER_NOT_FOUND);
		res.json(user);
	}
}
