import { app } from '../..';
import { IRouteDefinition } from '../interfaces/routeDefinition';

export function Controller(baseRoute: string, middlewares: Array<Function> = []) {
	return function (target: any) {
		const routes: IRouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor
		);
		for (const route of routes) {
			const { method, path, middleware, handler } = route;
			app[method](`${baseRoute}${path}`, [...middlewares, ...[middleware]], handler);
		}
	};
}
