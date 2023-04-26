import { Container } from 'inversify';

import { Engine } from './engine';
import { Fuel } from './fuel';

export const container = new Container();

// mapping of all the classes
container.bind<Engine>(Engine).toSelf();
container.bind<Fuel>(Fuel).toSelf();

// resolving all the classes
export const modules = {
	engine: container.resolve<Engine>(Engine),
};
