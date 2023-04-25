import express from 'express';

import { IRouteDefinition } from '../interfaces/routeDefinition';

export function Route(
	method: string,
	path: string,
	middleware: express.RequestHandler[] = []
) {
	return function (target: any, _: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		if (!Reflect.hasMetadata('routes', target.constructor.prototype)) {
			Reflect.defineMetadata('routes', [], target.constructor.prototype);
		}

		const routes: IRouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor.prototype
		);
		routes.push({ method, path, middleware, handler: originalMethod });
	};
}
