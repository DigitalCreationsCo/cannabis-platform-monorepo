import { type ComplianceSelectorType, findCompliance } from '@gras/data-access';

/* =================================
Compliance Data Access - data class for ComplianceSheet table

members:
getComplianceSheet

================================= */

export default class ComplianceDA {
	static async getComplianceSheet({ state }: ComplianceSelectorType) {
		try {
			return await findCompliance({ state });
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
