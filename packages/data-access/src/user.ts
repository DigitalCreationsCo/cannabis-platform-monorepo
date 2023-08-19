/* eslint-disable sonarjs/no-duplicate-string */
import { createId } from '@paralleldrive/cuid2';
import {
	Prisma,
	type ImageUser,
	type Membership,
	type MembershipRole,
	type User,
} from '@prisma/client';
import { type AddressCreateType, type AddressWithCoordinates } from './address';
import prisma from './db/prisma';
import { type OrderWithDetails } from './order';

/*
 * User Data Access functions
 *
 * createUser
 * updateUser
 * createDispensaryAdmin
 * updateDispensaryAdmin
 * findUserWithDetailsByEmail
 * findUserWithDetailsByPhone
 * findUserWithDetailsById
 * updateUserPasswordToken
 */
export async function createUser(userData: UserCreateType) {
	try {
		console.info('userData: ', userData);
		const user = await prisma.user.create({
			data: {
				email: userData.email,
				emailVerified: userData.emailVerified ?? false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				isLegalAge: userData.isLegalAge,
				idVerified: userData.idVerified,
				idBackImage: userData.idBackImage,
				idFrontImage: userData.idFrontImage,
				isSignUpComplete: userData.isSignUpComplete,
				scannedDOB: userData.scannedDOB,
				address: userData.address
					? {
							create: userData.address?.map((address: any) => ({
								street1: address.street1,
								street2: address.street2,
								city: address.city,
								state: address.state,
								zipcode: address.zipcode,
								country: address.country,
								countryCode: address.countryCode,
								coordinates: {
									create: {
										latitude: Number(address.coordinates?.latitude),
										longitude: Number(address.coordinates?.longitude),
									},
								},
							})),
					  }
					: undefined,
				profilePicture: {
					create: {
						location: userData.profilePicture.location,
					},
				},
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				profilePicture: true,
			},
		});
		console.debug('user created: ', user);
		return user;
	} catch (error: any) {
		console.error(error);
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			const dupFields = error?.meta?.target;
			throw new Error(
				`${dupFields} exists already. Please choose a different ${dupFields}.`,
			);
		}
		throw new Error(error.message);
	}
}

export async function upsertUser(userData: UserCreateType) {
	try {
		const newId = createId();
		const user = await prisma.user.upsert({
			where: {
				email: userData.email,
			},
			create: {
				id: userData.id ?? newId,
				email: userData.email,
				emailVerified: userData.emailVerified ?? false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				isLegalAge: userData.isLegalAge,
				idVerified: userData.idVerified,
				idBackImage: userData.idBackImage,
				idFrontImage: userData.idFrontImage,
				isSignUpComplete: userData.isSignUpComplete,
				scannedDOB: userData.scannedDOB,
				address: userData.address
					? {
							create: {
								street1: userData.address[0].street1,
								street2: userData.address[0].street2,
								city: userData.address[0].city,
								state: userData.address[0].state,
								zipcode: userData.address[0].zipcode,
								country: userData.address[0].country,
								countryCode: userData.address[0].countryCode,
								coordinates: {
									create: {
										latitude: Number(userData.address[0].coordinates?.latitude),
										longitude: Number(
											userData.address[0].coordinates?.longitude,
										),
									},
								},
							},
					  }
					: undefined,
				profilePicture: userData.profilePicture
					? {
							create: {
								location: userData.profilePicture?.location,
							},
					  }
					: undefined,
			},
			update: {
				email: userData.email,
				emailVerified: userData.emailVerified ?? false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				isLegalAge: userData.isLegalAge,
				idVerified: userData.idVerified,
				idBackImage: userData.idBackImage,
				idFrontImage: userData.idFrontImage,
				isSignUpComplete: userData.isSignUpComplete,
				scannedDOB: userData.scannedDOB,
				address: userData.address
					? {
							upsert: userData.address.map((address: AddressCreateType) => ({
								where: {
									id: address.id,
								},
								create: {
									street1: address.street1,
									street2: address.street2,
									city: address.city,
									state: address.state,
									zipcode: address.zipcode,
									country: address.country,
									countryCode: address.countryCode,
									coordinates: {
										create: {
											latitude: Number(address.coordinates?.latitude),
											longitude: Number(address.coordinates?.longitude),
										},
									},
								},
								update: {
									street1: address.street1,
									street2: address.street2,
									city: address.city,
									state: address.state,
									zipcode: address.zipcode,
									country: address.country,
									countryCode: address.countryCode,
									coordinates: {
										create: {
											latitude: Number(address.coordinates?.latitude),
											longitude: Number(address.coordinates?.longitude),
										},
									},
								},
							})),
					  }
					: undefined,
				profilePicture: {
					connectOrCreate: {
						where: {
							userId: userData.id ?? newId,
						},
						create: {
							location: userData.profilePicture?.location,
						},
					},
				},
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				profilePicture: true,
				memberships: true,
				orders: true,
			},
		});
		console.info('user upserted: ', user.email);
		return user;
	} catch (error: any) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			const dupFields = error?.meta?.target;
			throw new Error(
				`${dupFields} exists already. Please choose a different ${dupFields}.`,
			);
		}
		throw new Error(error.message);
	}
}

export async function updateUser(userData: UserCreateType) {
	try {
		const newId = createId();

		const user = await prisma.user.update({
			where: {
				email: userData.email,
			},
			data: {
				id: userData.id ?? newId,
				email: userData.email,
				emailVerified: userData.emailVerified ?? false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: userData.termsAccepted,
				idBackImage: userData.idBackImage,
				idFrontImage: userData.idFrontImage,
				idVerified: userData.idVerified,
				isLegalAge: userData.isLegalAge,
				isSignUpComplete: userData.isSignUpComplete,
				scannedDOB: userData.scannedDOB,
				dialCode: userData.dialCode,
				phone: userData.phone,
				address: userData.address
					? {
							upsert: userData.address.map((address: AddressCreateType) => ({
								where: {
									id: address.id,
								},
								create: {
									street1: address.street1,
									street2: address.street2,
									city: address.city,
									state: address.state,
									zipcode: address.zipcode,
									country: address.country,
									countryCode: address.countryCode,
									coordinates: {
										create: {
											latitude: Number(address.coordinates?.latitude),
											longitude: Number(address.coordinates?.longitude),
										},
									},
								},
								update: {
									street1: address.street1,
									street2: address.street2,
									city: address.city,
									state: address.state,
									zipcode: address.zipcode,
									country: address.country,
									countryCode: address.countryCode,
									coordinates: {
										create: {
											latitude: Number(address.coordinates?.latitude),
											longitude: Number(address.coordinates?.longitude),
										},
									},
								},
							})),
					  }
					: undefined,
				profilePicture: {
					connectOrCreate: {
						where: {
							userId: userData.id ?? newId,
						},
						create: {
							id: userData.id ?? newId,
							location: userData.profilePicture.location,
						},
					},
				},
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				profilePicture: true,
				memberships: true,
				orders: true,
			},
		});

		console.info('user updated: ', user.email);
		return user;
	} catch (error: any) {
		console.error(error);
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			const dupFields = error?.meta?.target;
			throw new Error(
				`${dupFields} exists already. Please choose a different ${dupFields}.`,
			);
		}
		throw new Error(error.message);
	}
}

export async function upsertDispensaryAdmin(
	userData: UserCreateType,
	createParams: CreateUserParams,
) {
	try {
		const { ...addressData } = userData.address[0];

		const user = await prisma.user.upsert({
			where: {
				email: userData.email,
			},
			create: {
				email: userData.email,
				emailVerified: false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				address: {
					create: [{ ...addressData }],
				},
				memberships: {
					create: {
						role: createParams['role'] as MembershipRole,
						organizationId: createParams['dispensaryId'],
					},
				},
			},
			update: {
				email: userData.email,
				emailVerified: false,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				termsAccepted: true,
				dialCode: userData.dialCode,
				phone: userData.phone,
				address: {
					create: [{ ...addressData }],
				},
				memberships: {
					create: {
						role: createParams['role'] as MembershipRole,
						organizationId: createParams['dispensaryId'],
					},
				},
			},
			include: {
				memberships: true,
			},
		});

		console.info('upsert Dispensary Staff record: ', user.email);
		return user;
	} catch (error: any) {
		console.info('create Dispensary Staff user error: ', error);
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			const dupFields = error?.meta?.target;
			throw new Error(
				`${dupFields} exists already. Please choose a different ${dupFields}.`,
			);
		}
		throw new Error(error.message);
	}
}

export async function updateDispensaryAdmin(
	userData: any,
	createParams: CreateUserParams,
) {
	try {
		const { organizationId, coordinates, coordinateId, ...addressData } =
			userData.address;

		const user = await prisma.user.update({
			where: {
				id: userData.id,
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
				address: userData.address
					? {
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
					  }
					: undefined,
				profilePicture: userData.profilePicture
					? {
							create: {
								...userData.profilePicture,
							},
					  }
					: undefined,
				memberships: userData.memberships?.[0]?.id
					? {
							connectOrCreate: {
								where: {
									id: userData?.memberships?.[0].id,
								},
								create: {
									role: createParams['role'] as MembershipRole,
									organizationId: createParams['dispensaryId'],
								},
							},
					  }
					: {
							create: {
								role: createParams['role'] as MembershipRole,
								organizationId: createParams['dispensaryId'],
							},
					  },
			},
			include: {
				memberships: true,
			},
		});

		console.info('updated Dispensary Staff record: ', user.email);
		return user;
	} catch (error: any) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			const dupFields = error?.meta?.target;
			throw new Error(
				`${dupFields} exists already. Please choose a different ${dupFields}.`,
			);
		}
		throw new Error(error.message);
	}
}

export async function findUserWithDetailsByEmail(
	email: string,
): Promise<UserWithDetails | null> {
	try {
		return await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				memberships: {
					orderBy: {
						role: 'asc',
					},
				},
				profilePicture: true,
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function findUserWithDetailsByPhone(
	phone: string,
): Promise<UserWithDetails | null> {
	try {
		return await prisma.user.findUnique({
			where: {
				phone,
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				memberships: {
					orderBy: {
						role: 'asc',
					},
				},
				profilePicture: true,
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function findUserWithDetailsById(
	id: string,
): Promise<UserWithDetails | null> {
	try {
		return await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				memberships: {
					orderBy: {
						role: 'asc',
					},
				},
				profilePicture: true,
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export type UserWithDetails = User &
	Omit<User, 'createdAt' | 'updatedAt'> & {
		address: AddressWithCoordinates[];
		profilePicture: ImageUser | null;
		memberships?: Membership[] | null;
		orders?: OrderWithDetails[];
		preferences?: null;
	};

export type UserCreateType = Prisma.UserCreateInput & {
	address: any;
	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type UserDispensaryAdmin = User & {
	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type UserWithProfilePicture = User & {
	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
};

export type UserWithProfilePictureBlob = {
	id: string;
	username: string;
	profilePicture: ImageUser;
};

export type UserLoginData = {
	email: string;
	password: string;
};

export type CreateUserParams = {
	role: string;
	dispensaryId: string;
};
