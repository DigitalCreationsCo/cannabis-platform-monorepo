import { type Manifest } from './fleet.types';

export default class FleetConfig {
	description: string;
	manifests: Manifest[];

	constructor() {
		this.description = 'FleetConfig';
		this.manifests = [];
	}
}
