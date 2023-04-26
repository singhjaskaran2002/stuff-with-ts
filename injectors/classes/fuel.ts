import { injectable } from 'inversify';

@injectable()
export class Fuel {
	addFuel() {
		console.log('Fuel added.');
	}
}
