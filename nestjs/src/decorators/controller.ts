import { app } from '../..';
import { IRouteDefinition } from '../interfaces/routeDefinition';

export function Controller(baseRoute: string) {
	return function (target: any) {
		const routes: IRouteDefinition[] = Reflect.getMetadata(
			'routes',
			target.constructor.prototype
		);
		for (const route of routes) {
			const { method, path, middleware, handler } = route;
			app[method](`${baseRoute}${path}`, middleware, handler);
		}
	};
}
