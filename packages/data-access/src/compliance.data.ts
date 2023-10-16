import { type StateAbbreviationType } from './address.types';

export async function findComplianceSheet({
	state,
}: ComplianceSelectorType): Promise<ComplianceSheet> {
	try {
		return await prisma.compliance.findMany({
			where: { state: state },
		});
	} catch (error: any) {
		console.error('findComplianceSheet: ', error);
		throw new Error(error);
	}
}

export type ComplianceSelectorType = {
	state: StateAbbreviationType;
};
