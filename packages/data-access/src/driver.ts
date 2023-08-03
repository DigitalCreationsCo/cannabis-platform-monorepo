import { Driver, DriverSession, Prisma, Route, User } from '@prisma/client';
import prisma from './db/prisma';
import { UserCreateType } from './user';

/*
 * Driver Data Access functions
 *
 * createDriver
 * updateDriver
 *
 * findDriverWithDetailsByEmail
 * findDriverWithDetailsByPhone
 * findDriverWithDetailsById
 */

/**
 * CREATE DRIVER RECORD ALONG WITH SESSION RECORD
 */
export async function createDriver(userData: UserCreateType) {
	try {
		const { coordinates, ...addressData } = userData.address[0];
		const user = await prisma.user.create({
			data: {
				email: userData.email,
				emailVerified: false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				address: {
					create: {
						...addressData,
						coordinates: {
							create: {
								latitude: Number(coordinates?.latitude),
								longitude: Number(coordinates?.longitude),
							},
						},
					},
				},
				profilePicture: {
					create: {
						location: userData.profilePicture?.location,
					},
				},
				driver: {
					connectOrCreate: {
						where: {
							id: userData.id,
						},
						create: {
							email: userData.email,
						},
					},
				},
			},
		});

		return user;
	} catch (error: any) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new Error(
					'This user exists already. Please choose a different username or email.'
				);
			}
		}
		throw new Error(error);
	}
}

export async function updateDriver(userData: UserCreateType) {
	try {
		const { coordinates, ...addressData } = userData.address[0];

		const user = await prisma.user.update({
			where: {
				email: userData.email,
			},
			data: {
				email: userData.email,
				emailVerified: false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				address: {
					create: {
						...addressData,
						coordinates: coordinates?.id
							? {
									connectOrCreate: {
										where: {
											id: coordinates?.id,
										},
										create: {
											latitude: Number(coordinates?.latitude),
											longitude: Number(coordinates?.longitude),
										},
									},
							  }
							: {
									create: {
										latitude: Number(coordinates?.latitude),
										longitude: Number(coordinates?.longitude),
									},
							  },
					},
				},
				profilePicture: userData.profilePicture
					? {
							create: {
								...userData.profilePicture,
							},
					  }
					: undefined,
				memberships: userData.memberships
					? {
							create: userData.memberships,
					  }
					: undefined,
			},
		});

		console.info('user updated: ', user.email);
		return user;
	} catch (error: any) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new Error(
					'This user exists already. Please choose a different username or email.'
				);
			}
		}
		throw new Error(error);
	}
}

export async function findDriverWithDetailsByEmail(
	email: string
): Promise<DriverWithDetails | null> {
	try {
		const driver = await prisma.driver.findUnique({
			where: {
				email,
			},
			include: {
				user: {
					include: {
						address: true,
						profilePicture: true,
					},
				},
			},
		});

		return driver;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function findDriverWithDetailsByPhone(
	phone: string
): Promise<DriverWithDetails | null> {
	try {
		const user = await prisma.user.findUnique({
			where: {
				phone,
			},
			include: {
				driver: {},
				address: true,
				memberships: {
					orderBy: {
						role: 'asc',
					},
				},
				profilePicture: true,
			},
		});

		if (!user || !user.driver)
			throw new Error("Sorry, we couldn't find you. Please try again.");

		const { driver, ...userData } = user;

		const driverShape = {
			...user?.driver,
			user: {
				...userData,
			},
		};

		return driverShape;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function findDriverWithDetailsById(
	id: string
): Promise<DriverWithDetails | null> {
	try {
		const driver = await prisma.driver.findUnique({
			where: {
				id,
			},
			include: {
				user: {
					include: {
						address: true,
						profilePicture: true,
					},
				},
			},
		});

		return driver;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

// used for querying driver record with full user info
export type DriverWithDetails = Driver & {
	user: User;
};

// used for querying driver for current session details and location
export type DriverWithSessionDetails = Driver & {
	user: User;
	driverSession: DriverSessionWithJoinedData;
};

// represents joined driver session data from prisma and mongodb
export type DriverSessionWithJoinedData = DriverSession & {
	currentCoordinates: number[];
	routeId: string;
	route: Route;
};

export type DriverCreateType = Prisma.UserUncheckedCreateWithoutDriverInput & {
	driver: Prisma.DriverUncheckedCreateInput;
	address: (Prisma.AddressCreateWithoutOrganizationInput & {
		coordinates: Prisma.CoordinatesCreateInput;
	})[];
	profilePicture: Prisma.ImageUserUncheckedCreateInput;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type RouteWithCoordinates = Route & {
	coordinates: number[][];
};
