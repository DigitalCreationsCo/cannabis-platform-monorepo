import { axios, formatToTimeZone, TimeZoneMap } from '@cd/core-lib';
import {
	type OrderWithFullDetails,
	type USStateAbbreviated,
	type OrderWithDispatchDetails,
	type Package,
} from '@cd/data-access';
import { type POSIntegration } from './integration.types';

const MetrcIntegration: POSIntegration = class {
	static getMetricStateEndpoint(operatingState: USStateAbbreviated) {
		switch (operatingState) {
			case 'MD':
				return 'https://api-md.metrc.com';
				break;
			case 'NJ':
				return 'https://api-nj.metrc.com';
				break;
			default:
				throw new Error('Operating state not supported');
		}
	}

	static async processPickupOrder(order: OrderWithFullDetails) {
		try {
			// if (!order.organization.metrcLicenseNumber)
			// 	throw new Error('Organization does not have a Metrc license number');

			// const endpoint = this.getMetricStateEndpoint(
			// 	order.organization.address.state,
			// );

			// // get local Dispensary date and time
			// const transactionDate = formatToTimeZone(
			// 	order.createdAt,
			// 	TimeZoneMap[order.organization.address.state],
			// 	'yyyy-MM-dd',
			// );

			// const { metrcLicenseNumber } = order.organization;

			// const transactionPackageData: Package[] = order.items.map((item) => ({}));

			// await axios.post(
			// 	endpoint +
			// 		`/sales/v1/transactions/${transactionDate}?licenseNumber=${metrcLicenseNumber}`,
			// 	transactionPackageData,
			// );
			return;
		} catch (error: any) {
			console.error('Metrc Integration: ', error.message);
			throw new Error(error.message);
		}
	}

	static async processDeliveryOrder(order: OrderWithDispatchDetails['order']) {
		try {
			// if (!order.organization.metrcLicenseNumber)
			// 	throw new Error('Organization does not have a Metrc license number');

			// const endpoint = this.getMetricStateEndpoint(
			// 	order.organization.address.state,
			// );
			// await axios.post(endpoint, {});
			return;
		} catch (error: any) {
			console.error('Metrc Integration: ', error.message);
			throw new Error(error.message);
		}
	}
};

export default MetrcIntegration;
