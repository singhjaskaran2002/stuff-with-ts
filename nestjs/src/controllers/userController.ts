import express from 'express';

import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';

@Controller('/users')
export class UserController {
	@Route('get', '/')
	static getAllUsers(_: express.Request, res: express.Response) {
		res.send([
			{ id: 1, name: 'John' },
			{ id: 2, name: 'Jane' },
		]);
	}

	@Route('get', '/:id')
	static getUserById(req: express.Request, res: express.Response) {
		const userId = req.params.id;
		res.send({ id: userId, name: 'John' });
	}
}
