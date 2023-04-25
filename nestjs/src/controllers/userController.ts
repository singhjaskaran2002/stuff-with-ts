import express from 'express';

import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { users } from '../fakeData/users';

@Controller('/users')
export class UserController {
	@Route('get', '/')
	static getAllUsers(_: express.Request, res: express.Response) {
		res.json(users);
	}

	@Route('get', '/:id')
	static getUserById(req: express.Request, res: express.Response) {
		const userId = +req.params.id;
		const user = users.find((item) => item.id === userId);
		if (!user) return res.status(404).json('NOT FOUND');
		res.json(user);
	}
}
