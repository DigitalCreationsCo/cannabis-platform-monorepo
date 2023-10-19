import { type Compliance, type USStateAbbreviated } from '@prisma/client';
import prisma from './db/prisma';

export async function findCompliance({
	state,
}: ComplianceSelectorType): Promise<Compliance | null> {
	try {
		return await prisma.compliance.findUnique({
			where: { state: state },
			include: {
				license: true,
				transport: true,
				sale: true,
			},
		});
	} catch (error: any) {
		console.error('findCompliance: ', error);
		throw new Error(error);
	}
}

export type ComplianceSelectorType = {
	state: USStateAbbreviated;
};
