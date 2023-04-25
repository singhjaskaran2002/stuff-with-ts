export interface IRouteDefinition {
	method: string;
	path: string;
	middleware: Function[];
	handler: Function;
}
