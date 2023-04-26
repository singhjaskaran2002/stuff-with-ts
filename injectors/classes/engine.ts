import { injectable } from 'inversify';

import { Fuel } from './fuel';

@injectable()
export class Engine {
	constructor(private fuel: Fuel) {}

	start() {
		this.fuel.addFuel();
		console.log('Engine started.');
	}
}
