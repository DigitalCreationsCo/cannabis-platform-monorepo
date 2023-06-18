import { createId } from "@paralleldrive/cuid2";
import { ImageUser, Membership, MembershipRole, Prisma, User } from "@prisma/client";
import { AddressWithDetails } from "./address";
import prisma from "./db/prisma";
import { OrderWithDetails } from "./order";

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

        let
            newId = createId();

        const
            user = await prisma.user.create({
                data: {
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
                    isSignUpComplete: true,
                    scannedDOB: userData.scannedDOB,
                    address: {
                        create: userData.address.map((address: any) => ({
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
                                    longitude: Number(address.coordinates?.longitude)
                                }
                            }
                        }))
                    },
                    profilePicture: {
                        connectOrCreate: {
                            where: {
                                userId: userData.id ?? newId,
                            },
                            create: {
                                id: userData.id ?? newId,
                                location: userData.profilePicture?.location,
                            }
                        }
                    }
                },
                include: {
                    address: {
                        include: {
                            coordinates: true
                        }
                    },
                    profilePicture: true,
                }
            })

        console.log('user created: ', user.email)
        return user;
    } catch (error: any) {
        console.info('upsert user error: ', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('This user exists already. Please choose a different username or email.')
            }
        }
        throw new Error(error)
    }
}

export async function upsertUser(userData: UserCreateType) {
    try {

        let
            newId = createId();

        const
            user = await prisma.user.upsert({
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
                    isSignUpComplete: true,
                    scannedDOB: userData.scannedDOB,
                    address: {
                        create: userData.address.map((address: any) => ({
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
                                    longitude: Number(address.coordinates?.longitude)
                                }
                            }
                        }))
                    },
                    profilePicture: {
                        connectOrCreate: {
                            where: {
                                userId: userData.id ?? newId,
                            },
                            create: {
                                id: userData.id ?? newId,
                                location: userData.profilePicture?.location,
                            }
                        }
                    }
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
                    isSignUpComplete: true,
                    scannedDOB: userData.scannedDOB,
                    address: {
                        create: userData.address.map((address: any) => ({
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
                                    longitude: Number(address.coordinates?.longitude)
                                }
                            }
                        }))
                    },
                    profilePicture: {
                        connectOrCreate: {
                            where: {
                                userId: userData.id ?? newId,
                            },
                            create: {
                                id: userData.id ?? newId,
                                location: userData.profilePicture?.location,
                            }
                        }
                    }
                },
                include: {
                    address: {
                        include: {
                            coordinates: true
                        }
                    },
                    profilePicture: true,
                    memberships: true,
                    orders: true,
                    purchases: true,
                }
            });

        console.log('user upserted: ', user.email)
        return user;
    } catch (error: any) {
        console.info('upsert user error: ', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('This user exists already. Please choose a different username or email.')
            }
        }
        throw new Error(error)
    }
}

export async function updateUser(userData: UserCreateType) {
    try {

        let
            newId = createId();

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
                termsAccepted: true,
                dialCode: userData.dialCode,
                phone: userData.phone,
                address: {
                    create: userData.address.map((address: any) => address)
                },
                profilePicture: {
                    connectOrCreate: {
                        where: {
                            userId: userData.id ?? newId,
                        },
                        create: {
                            id: userData.id ?? newId,
                            location: userData.profilePicture?.location,
                        }
                    }
                }
            },
            include: {
                address: {
                    include: {
                        coordinates: true
                    }
                },
                profilePicture: true,
                memberships: true,
                orders: true,
                purchases: true,
            }
        })

        console.log('user updated: ', user.email)
        return user;
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('This user exists already. Please choose a different username or email.')
            }
        }
        throw new Error(error)
    }
}

export async function upsertDispensaryAdmin(userData: UserCreateType, createParams: CreateUserParams) {
    try {

        const { ...addressData } = userData.address[0]

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
                    create: [
                        { ...addressData },
                    ],
                },
                memberships: {
                    connectOrCreate: {
                        where: {
                            id: userData?.memberships?.[0].id ?? undefined,
                        },
                        create: {
                            role: createParams["role"] as MembershipRole,
                            organizationId: createParams["dispensaryId"],
                        }
                    }
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
                    create: [
                        { ...addressData },
                    ],
                },
                memberships: !!userData.memberships?.[0]?.id ? {
                    connectOrCreate: {
                        where: {
                            id: userData?.memberships?.[0].id ?? undefined,
                        },
                        create: {
                            role: createParams["role"] as MembershipRole,
                            organizationId: createParams["dispensaryId"],
                        },
                    }
                } : {
                    create: {
                        role: createParams["role"] as MembershipRole,
                        organizationId: createParams["dispensaryId"],
                    }
                },
            },
            include: {
                memberships: true
            }
        })

        console.log('admin user upsert: ', user.email)
        return user;
    } catch (error: any) {
        console.log('create Dispensary Admin user error: ', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('This user exists already. Please choose a different username or email.')
            }
        }
        throw new Error(error)
    }
}

export async function updateDispensaryAdmin(userData: any, createParams: CreateUserParams) {
    try {
        const { organizationId, coordinates, coordinateId, ...addressData } = userData.address

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
                address: userData.address ? {
                    create: {
                        ...addressData,
                        coordinates: coordinates?.id ? {
                            connectOrCreate: {
                                where: {
                                    id: coordinates?.id,
                                },
                                create: {
                                    latitude: Number(coordinates?.latitude),
                                    longitude: Number(coordinates?.longitude),
                                }
                            }
                        } : {
                            create: {
                                latitude: Number(coordinates?.latitude),
                                longitude: Number(coordinates?.longitude),
                            }
                        }
                    }
                } : undefined,
                profilePicture: userData.profilePicture ? {
                    create: {
                        ...userData.profilePicture
                    }
                } : undefined,
                memberships: userData.memberships?.[0]?.id ? {
                    connectOrCreate: {
                        where: {
                            id: userData?.memberships?.[0].id
                        },
                        create: {
                            role: createParams["role"] as MembershipRole,
                            organizationId: createParams["dispensaryId"],
                        },
                    }
                } : {
                    create: {
                        role: createParams["role"] as MembershipRole,
                        organizationId: createParams["dispensaryId"],
                    },
                }
            },
            include: {
                memberships: true
            }
        })

        console.log('admin user updated: ', user.email)
        return user;
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('This user exists already. Please choose a different username or email.')
            }
        }
        throw new Error(error)
    }
}

export async function findUserWithDetailsByEmail(email: string): Promise<UserWithDetails | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                address: {
                    include: {
                        coordinates: true
                    }
                },
                memberships: {
                    orderBy: {
                        role: 'asc',
                    },
                },
                profilePicture: true,
            },
        })
        return user
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findUserWithDetailsByPhone(phone: string): Promise<UserWithDetails | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                phone
            },
            include: {
                address: {
                    include: {
                        coordinates: true
                    }
                },
                memberships: {
                    orderBy: {
                        role: 'asc',
                    },
                },
                profilePicture: true,
            },
        })
        return user
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findUserWithDetailsById(id: string): Promise<UserWithDetails | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                address: {
                    include: {
                        coordinates: true
                    }
                },
                memberships: {
                    orderBy: {
                        role: 'asc',
                    },
                },
                profilePicture: true,
            },
        })
        return user
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export type UserWithDetails = User & Omit<User, "createdAt" | "updatedAt"> & {
    address: AddressWithDetails[]
    imageUser?: ImageUser[] | null
    memberships?: Membership[] | null
    orders?: OrderWithDetails[]
    preferences?: null
}

export type UserCreateType = Prisma.UserCreateInput & {
    address: any;
    profilePicture: Prisma.ImageUserCreateWithoutUserInput;
    memberships: Prisma.MembershipUpsertArgs["create"][];
}

export type UserLoginData = {
    email: string;
    password: string;
}

export type CreateUserParams = {
    role: string;
    dispensaryId: string;
}