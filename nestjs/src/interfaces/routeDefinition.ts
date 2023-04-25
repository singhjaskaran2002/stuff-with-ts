import express from 'express';

export interface IRouteDefinition {
	method: string;
	path: string;
	middleware: express.RequestHandler[];
	handler: Function;
}
