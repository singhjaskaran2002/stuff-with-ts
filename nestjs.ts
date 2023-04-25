import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';

interface RouteDefinition {
	method: string;
	path: string;
	middleware: express.RequestHandler[];
	handler: Function;
}

const app = express();
app.use(bodyParser.json());

function Controller(baseRoute: string) {
	return function (target: any) {
		const routes: RouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor.prototype
		);
		for (const route of routes) {
			const { method, path, middleware, handler } = route;
			app[method](`${baseRoute}${path}`, middleware, handler);
		}
	};
}

function Route(
	method: string,
	path: string,
	middleware: express.RequestHandler[] = []
) {
	return function (target: any, _: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		if (!Reflect.hasMetadata('routes', target.constructor.prototype)) {
			Reflect.defineMetadata('routes', [], target.constructor.prototype);
		}

		const routes: RouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor.prototype
		);
		routes.push({ method, path, middleware, handler: originalMethod });
	};
}

@Controller('/users')
class UserController {
	@Route('get', '/')
	static getAllUsers(req: express.Request, res: express.Response) {
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

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
