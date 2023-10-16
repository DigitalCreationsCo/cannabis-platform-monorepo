import { type StateAbbreviationType } from '@cd/core-lib';
import {
	type ComplianceSelectorType,
	findComplianceSheet,
} from '@cd/data-access';

/* =================================
Compliance Data Access - data class for ComplianceSheet table

members:
getComplianceSheet

================================= */

export default class ComplianceDA {
	static async getComplianceSheet({ state }: ComplianceSelectorType) {
		try {
			return await findComplianceSheet({ state });
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
