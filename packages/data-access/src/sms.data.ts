import { type WeedTextDeal } from '@prisma/client';
import prisma from './db/prisma';
import { type OrganizationWithOrderDetails } from './organization.types';

/*
 *  findActiveDailyDeals
 *   createWeedTextDeal
 *   findDailyDeal
 *  findDailyDealsByOrganization
 */

/**
 * findActiveDailyDeals
 * @param
 * @returns
 */
export async function findActiveDailyDeals(): Promise<
	WeedTextDealWithOrganization[]
> {
	try {
		return await prisma.weedTextDeal.findMany({
			where: {
				startTime: { lte: new Date() },
				endTime: { gte: new Date() },
				isExpired: false,
			},
			include: {
				organization: {
					include: {
						address: { include: { coordinates: true } },
					},
				},
			},
		});
	} catch (error) {
		console.error('createWeedTextDeal: ', error);
		throw error;
	}
}

/**
 * createWeedTextDeal
 * @param deal WeedTextDeal
 * @returns Promise<WeedTextDeal>
 */
export async function createWeedTextDeal(
	deal: WeedTextDeal,
): Promise<WeedTextDeal> {
	try {
		return await prisma.weedTextDeal.create({
			data: {
				id: deal.id,
				title: deal.title,
				description: deal.description,
				total: deal.total,
				startTime: deal.startTime,
				endTime: deal.endTime,
				organizationId: deal.organizationId,
			},
			// include: {
			// 	organization: {
			// 		include: {
			// 			address: { include: { coordinates: true } },
			// 		},
			// 	},
			// },
		});
	} catch (error) {
		console.error('createWeedTextDeal: ', error);
		throw error;
	}
}

export async function findDailyDeal(id: string): Promise<WeedTextDeal | null> {
	try {
		return await prisma.weedTextDeal.findUnique({
			where: {
				id,
			},
		});
	} catch (error) {
		console.error('getDailyDeal: ', error);
		throw error;
	}
}

export async function findDailyDealsByOrganization(
	organizationId: string,
): Promise<WeedTextDeal[]> {
	try {
		return await prisma.weedTextDeal.findMany({
			where: {
				organizationId,
			},
		});
	} catch (error) {
		console.error('getDailyDealsByOrganization: ', error);
		throw error;
	}
}

/*
 * update all deals that have expired
 * @param
 * @returns
 */
export async function setExpiredDailyDeals() {
	try {
		await prisma.weedTextDeal.updateMany({
			where: {
				endTime: { lte: new Date() },
			},
			data: {
				isExpired: true,
			},
		});
	} catch (error) {
		console.error('setExpiredDailyDeals: ', error);
		throw error;
	}
}

export type WeedTextDealWithOrganization = WeedTextDeal & {
	organization: OrganizationWithOrderDetails;
};
