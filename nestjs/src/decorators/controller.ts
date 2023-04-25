import { app } from '../server';
import { IRouteDefinition } from '../interfaces/routeDefinition';
import { VERSION } from '../constants/app';

export function Controller(baseRoute: string, middlewares: Array<Function> = []) {
	return function (target: any) {
		const routes: IRouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor
		);
		for (const route of routes) {
			const { method, path, middleware, handler } = route;
			app[method](`${VERSION.v1}${baseRoute}${path}`, [...middlewares, ...[middleware]], handler);
		}
	};
}
