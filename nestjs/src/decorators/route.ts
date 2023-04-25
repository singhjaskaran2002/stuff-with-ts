import { IRouteDefinition } from '../interfaces/routeDefinition';

export function Route(
	method: string,
	path: string,
	middleware: Function[] = []
) {
	return function (target: any, _: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		if (!Reflect.hasMetadata('routes', target.constructor)) {
			Reflect.defineMetadata('routes', [], target.constructor);
		}

		const routes: IRouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor
		);
		routes.push({ method, path, middleware, handler: originalMethod });
	};
}
