/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-duplicated-branches */
import { type POS } from '@gras/data-access';
import { type POSIntegration } from './integration.types';

export class IntegrationService {
	static async getPOSIntegrationService(pos: POS) {
		try {
			let POSIntegrationService: POSIntegration;
			switch (pos) {
				case 'dutchie':
					// Note:
					// dutchiePOS delivery does not sync to metrc.
					// use metrc integration to record delivery to metrc
					POSIntegrationService = await (
						await import('./dutchiePOS')
					).DutchiePOS;
					break;
				case 'blaze':
					POSIntegrationService = await (await import('./blazePOS')).BlazePOS;
					break;
				case 'weedmaps':
					POSIntegrationService = await (
						await import('./weedmapsPOS')
					).WeedmapsPOS;
					break;
				case null:
					throw new Error('POS is not set');
				default:
					throw new Error('POS is not set');
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
					).DutchiePOS;
					break;
				case 'blaze':
					InventoryIntegrationService = await (
						await import('./blazePOS')
					).BlazePOS;
					break;
				case 'weedmaps':
					InventoryIntegrationService = await (
						await import('./weedmapsPOS')
					).WeedmapsPOS;
					break;
				case null:
					throw new Error('Seed to Sale Service is not set');
				default:
					throw new Error('Seed to Sale Service is not set');
			}
			return InventoryIntegrationService;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
