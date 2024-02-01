/* eslint-disable sonarjs/no-duplicated-branches */
import { type POS } from '@cd/data-access';
import { type POSIntegration } from './integration.types';

export default class IntegrationService {
	static async getPOSIntegrationService(pos: POS) {
		try {
			let POSIntegrationService: POSIntegration;
			switch (pos) {
				case 'dutchie':
					// Note:
					// dutchiePOS delivery does not sync to metrc.
					// use metrc integration to record delivery to metrc
					POSIntegrationService = await (await import('./dutchiePOS')).default;
					break;
				case 'blaze':
					POSIntegrationService = await (await import('./blazePOS')).default;
					break;
				case 'weedmaps':
					POSIntegrationService = await (await import('./weedmapsPOS')).default;
					break;
				case 'none':
					POSIntegrationService = await (
						await import('./metrcInventory')
					).default;
					break;
				default:
					POSIntegrationService = await (
						await import('./metrcInventory')
					).default;
			}
			return POSIntegrationService;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getS2SIntegrationService(pos: POS) {
		try {
			let InventoryIntegrationService: POSIntegration;
			switch (pos) {
				case 'dutchie':
					// Note:
					// dutchiePOS delivery does not sync to metrc.
					// use metrc integration to record delivery to metrc
					InventoryIntegrationService = await (
						await import('./dutchiePOS')
					).default;
					break;
				case 'blaze':
					InventoryIntegrationService = await (
						await import('./blazePOS')
					).default;
					break;
				case 'weedmaps':
					InventoryIntegrationService = await (
						await import('./weedmapsPOS')
					).default;
					break;
				case 'none':
					InventoryIntegrationService = await (
						await import('./metrcInventory')
					).default;
					break;
				default:
					InventoryIntegrationService = await (
						await import('./metrcInventory')
					).default;
			}
			return InventoryIntegrationService;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
