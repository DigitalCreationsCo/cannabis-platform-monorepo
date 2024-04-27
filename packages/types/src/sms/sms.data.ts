// import { type ProductVariant, type DailyDeal } from '@prisma/client';
// import { type OrganizationWithOrderDetails } from '../dispensary/organization.types';
// import prisma from './db/prisma';

// /*
//  *  findActiveDailyDeals
//  *   createDailyDeal
//  *   findDailyDeal
//  *  findDailyDealsByOrganization
//  */

// /**
//  * findActiveDailyDeals
//  * @param
//  * @returns
//  */
// export async function findActiveDailyDeals(): Promise<
// 	DailyDealWithOrganization[]
// > {
// 	try {
// 		return await prisma.dailyDeal.findMany({
// 			where: {
// 				startTime: { lte: new Date() },
// 				endTime: { gte: new Date() },
// 				isExpired: false,
// 			},
// 			include: {
// 				organization: {
// 					include: {
// 						address: { include: { coordinates: true } },
// 					},
// 				},
// 			},
// 		});
// 	} catch (error) {
// 		console.error('createDailyDeal: ', error);
// 		throw error;
// 	}
// }

// /**
//  * createDailyDeal
//  * @param deal DailyDeal
//  * @returns Promise<DailyDeal>
//  */
// export async function createDailyDeal(
// 	deal: DailyDealWithProductDetails,
// ): Promise<DailyDeal> {
// 	try {
// 		return await prisma.dailyDeal.create({
// 			data: {
// 				title: deal.title,
// 				message: deal.message,
// 				startTime: deal.startTime ? new Date(deal.startTime) : undefined,
// 				endTime: deal.endTime ? new Date(deal.endTime) : undefined,
// 				doesRepeat: deal.doesRepeat,
// 				schedule: deal.schedule,
// 				organization: {
// 					connect: {
// 						id: deal.organizationId,
// 					},
// 				},
// 			},
// 			// include: {
// 			// 	organization: {
// 			// 		include: {
// 			// 			address: { include: { coordinates: true } },
// 			// 		},
// 			// 	},
// 			// },
// 		});
// 	} catch (error) {
// 		console.error('createDailyDeal: ', error);
// 		throw error;
// 	}
// }

// export async function findDailyDeal(id: string): Promise<DailyDeal | null> {
// 	try {
// 		return await prisma.dailyDeal.findUnique({
// 			where: {
// 				id,
// 			},
// 		});
// 	} catch (error) {
// 		console.error('getDailyDeal: ', error);
// 		throw error;
// 	}
// }

// export async function findDailyDealsByOrganization(
// 	organizationId: string,
// ): Promise<DailyDeal[]> {
// 	try {
// 		return await prisma.dailyDeal.findMany({
// 			where: {
// 				organizationId,
// 			},
// 		});
// 	} catch (error) {
// 		console.error('getDailyDealsByOrganization: ', error);
// 		throw error;
// 	}
// }

// /*
//  * update all deals that have expired
//  * @param
//  * @returns
//  */
// export async function setExpiredDailyDeals() {
// 	try {
// 		await prisma.dailyDeal.updateMany({
// 			where: {
// 				endTime: { lte: new Date() },
// 			},
// 			data: {
// 				isExpired: true,
// 			},
// 		});
// 	} catch (error) {
// 		console.error('setExpiredDailyDeals: ', error);
// 		throw error;
// 	}
// }

// export type DailyDealWithOrganization = DailyDeal & {
// 	organization: OrganizationWithOrderDetails;
// };

// export type DailyDealWithProductDetails = Omit<DailyDeal, 'id'> & {
// 	products: ProductVariant[];
// };

// export type DailyDealCreateWithSkus = Omit<
// 	DailyDeal,
// 	'products' | 'id' | 'isExpired' | 'total'
// > & {
// 	organization: OrganizationWithOrderDetails;
// };

export {};
