// /* eslint-disable sonarjs/no-duplicate-string */
// import { type UserCreateType } from '../user/user.data';
// import prisma from './db/prisma';
// import { type DriverCreateType, type DriverWithDetails } from './driver.types';

// /*
//  * Driver Data Access functions
//  *
//  * createDriver
//  * updateDriver
//  * updateDriverOnlineStatus
//  * findDriverWithDetailsByEmail
//  * findDriverWithDetailsByPhone
//  * findDriverWithDetailsById
//  */

// /**
//  * CREATE DRIVER RECORD ALONG WITH SESSION RECORD
//  */
// export async function createDriver(userData: DriverCreateType) {
// 	try {
// 		const { coordinates, ...addressData } = userData.address[0];
// 		return await prisma.driver.create<{
// 			data: Prisma.DriverCreateInput;
// 			include: any;
// 		}>({
// 			data: {
// 				email: userData.email,
// 				licenseNumber: null,
// 				user: {
// 					connectOrCreate: {
// 						where: {
// 							id: userData.id,
// 						},
// 						create: {
// 							id: userData.id,
// 							email: userData.email,
// 							emailVerified: false,
// 							username: userData.username,
// 							firstName: userData.firstName,
// 							lastName: userData.lastName,
// 							termsAccepted: true,
// 							dialCode: userData.dialCode,
// 							phone: userData.phone,
// 							is_legal_age: userData.is_legal_age,
// 							isSignUpComplete: true,
// 							id_verified: true,
// 							isSubscribedForWeedText: false,
// 							address: {
// 								create: {
// 									street1: addressData.street1,
// 									street2: addressData.street2,
// 									city: addressData.city,
// 									state: addressData.state,
// 									zipcode: addressData.zipcode,
// 									country: addressData.country,
// 									countryCode: addressData.countryCode,
// 									coordinates: {
// 										create: {
// 											longitude: Number(coordinates?.longitude),
// 											latitude: Number(coordinates?.latitude),
// 										},
// 									},
// 								},
// 							},
// 							profilePicture: {
// 								create: {
// 									location: userData.profilePicture?.location,
// 									alt: userData.profilePicture?.alt,
// 									blurhash: userData.profilePicture?.blurhash || '',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				driverSession: {
// 					create: {},
// 				},
// 			},
// 			include: {
// 				driverSession: true,
// 				user: {
// 					include: {
// 						address: { include: { coordinates: true } },
// 						profilePicture: true,
// 					},
// 				},
// 			},
// 		});
// 	} catch (error: any) {
// 		console.info('create Driver: ', error);
// 		if (error.code === 'P2002' || error.code === 'P2014')
// 			throw new Error(
// 				'This driver exists already. Please choose a different username or email.',
// 			);
// 		throw new Error(
// 			'An error occurred while creating the driver. Please try again.',
// 		);
// 	}
// }

// export async function updateDriverOnlineStatus(id: string, isOnline: boolean) {
// 	try {
// 		return await prisma.driver.update({
// 			where: {
// 				id,
// 			},
// 			data: {
// 				driverSession: {
// 					upsert: {
// 						create: {
// 							isOnline,
// 						},
// 						update: {
// 							isOnline,
// 						},
// 					},
// 				},
// 			},
// 		});
// 	} catch (error: any) {
// 		if (error.code === 'P2025') throw new Error(error.meta.cause);
// 		throw new Error('An error occurred updating the status');
// 	}
// }

// export async function updateDriver(userData: UserCreateType) {
// 	try {
// 		const { coordinates, ...addressData } = userData.address[0];

// 		return await prisma.user.update({
// 			where: {
// 				email: userData.email,
// 			},
// 			data: {
// 				email: userData.email,
// 				emailVerified: false,
// 				username: userData.username,
// 				firstName: userData.firstName,
// 				lastName: userData.lastName,
// 				termsAccepted: true,
// 				dialCode: userData.dialCode,
// 				phone: userData.phone,
// 				address: {
// 					create: {
// 						...addressData,
// 						coordinates: coordinates?.id
// 							? {
// 									connectOrCreate: {
// 										where: {
// 											id: coordinates?.id,
// 										},
// 										create: {
// 											latitude: Number(coordinates?.latitude),
// 											longitude: Number(coordinates?.longitude),
// 										},
// 									},
// 							  }
// 							: {
// 									create: {
// 										latitude: Number(coordinates?.latitude),
// 										longitude: Number(coordinates?.longitude),
// 									},
// 							  },
// 					},
// 				},
// 				profilePicture: userData.profilePicture
// 					? {
// 							create: {
// 								...userData.profilePicture,
// 							},
// 					  }
// 					: undefined,
// 				memberships: userData.memberships
// 					? {
// 							createMany: {
// 								data: userData.memberships as Prisma.MembershipCreateManyUserInput[],
// 							},
// 					  }
// 					: undefined,
// 			},
// 			include: {
// 				address: { include: { coordinates: true } },
// 				profilePicture: true,
// 				driver: {
// 					include: {
// 						driverSession: true,
// 					},
// 				},
// 			},
// 		});
// 	} catch (error: any) {
// 		if (
// 			error instanceof Prisma.PrismaClientKnownRequestError &&
// 			error.code === 'P2002'
// 		) {
// 			throw new Error(
// 				'This user exists already. Please choose a different username or email.',
// 			);
// 		}
// 		throw new Error(error.message);
// 	}
// }

// export async function findDriverWithDetailsByEmail(
// 	email: string,
// ): Promise<DriverWithDetails | null> {
// 	try {
// 		const driver = await prisma.driver.findUnique({
// 			where: {
// 				email,
// 			},
// 			include: {
// 				driverSession: true,
// 				user: {
// 					include: {
// 						address: { include: { coordinates: true } },
// 						profilePicture: true,
// 					},
// 				},
// 			},
// 		});

// 		if (!driver)
// 			throw new Error(
// 				'The driver was not found. Please check the email address and try again.',
// 			);

// 		return driver;
// 	} catch (error: any) {
// 		console.error('findDriverWithDetailsByEmail: ', error);

// 		if (error.code === 'P2025')
// 			throw new Error(
// 				'The driver was not found. Please check the email address and try again.',
// 			);
// 		throw new Error(error.message);
// 	}
// }

// export async function findDriverWithDetailsByPhone(
// 	phone: string,
// ): Promise<DriverWithDetails | null> {
// 	try {
// 		const user = await prisma.user.findUnique({
// 			where: {
// 				phone,
// 			},
// 			include: {
// 				driver: {
// 					include: {
// 						driverSession: true,
// 					},
// 				},
// 				address: { include: { coordinates: true } },
// 				memberships: {
// 					orderBy: {
// 						role: 'asc',
// 					},
// 				},
// 				profilePicture: true,
// 			},
// 		});

// 		if (!user || !user.driver)
// 			throw new Error(
// 				'The driver was not found. Please check the phone number and try again.',
// 			);

// 		const { driver, ...userData } = user;

// 		return {
// 			...user?.driver,
// 			user: {
// 				...userData,
// 			},
// 		};
// 	} catch (error: any) {
// 		console.error('findDriverWithDetailsByPhone: ', error);

// 		if (error.code === 'P2025')
// 			throw new Error(
// 				'The driver was not found. Please check the phone number and try again.',
// 			);
// 		throw new Error(error.message);
// 	}
// }

// export async function findDriverWithDetailsById(
// 	id: string,
// ): Promise<DriverWithDetails | null> {
// 	try {
// 		const driver = await prisma.driver.findUnique({
// 			where: {
// 				id,
// 			},
// 			include: {
// 				driverSession: true,
// 				user: {
// 					include: {
// 						address: { include: { coordinates: true } },
// 						profilePicture: true,
// 					},
// 				},
// 			},
// 		});

// 		if (!driver) throw new Error('The driver was not found.');
// 		return driver;
// 	} catch (error: any) {
// 		console.error('findDriverWithDetailsById: ', error);

// 		if (error.code === 'P2025') throw new Error('The driver was not found.');
// 		throw new Error(error.message);
// 	}
// }

// export async function deleteDriverById(id: string) {
// 	try {
// 		return await prisma.driver.delete({
// 			where: {
// 				id,
// 			},
// 		});
// 	} catch (error: any) {
// 		console.error('deleteDriverById:', error.message);
// 		if (error.meta.cause) throw new Error(error.meta.cause);
// 		throw new Error(error.message);
// 	}
// }

export {};
