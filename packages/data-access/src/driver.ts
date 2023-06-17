import { Coordinates, Driver, DriverSession, Prisma, Route, User } from "@prisma/client";
import prisma from "./db/prisma";
import { UserCreateType } from "./user";

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
export async function createDriver(userData: DriverCreateType) {
    try {
        const { coordinates, ...addressData } = userData.address[0]
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
                                longitude: Number(coordinates?.longitude)
                            }
                        }
                    },
                },
                imageUser: userData.imageUser ? {
                    create: {
                        ...userData.imageUser
                    }
                } : undefined,
                driver: {
                    connectOrCreate: {
                        where: {
                            id: userData.id
                        },
                        create: {
                        },
                    }
                }
            }
        });

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

export async function updateDriver(userData: UserCreateType) {
    try {
        const { coordinates, ...addressData } = userData.address[0]

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
                },
                imageUser: userData.imageUser ? {
                    create: {
                        ...userData.imageUser
                    }
                } : undefined,
                memberships: userData.memberships ? {
                    create: userData.memberships
                } : undefined,
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

export async function findDriverWithDetailsByEmail(email: string): Promise<DriverWithDetails | null> {
    try {
        const driver = await prisma.driver.findUnique({
            where: {
                email
            },
            include: {
                driverSession: true,
                user: {
                    include: {
                        address: true,
                        imageUser: true,
                    }
                }
            },
        })

        return driver

    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findDriverWithDetailsByPhone(phone: string): Promise<DriverWithDetails | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                phone
            },
            include: {
                driver: {
                    include: {
                        driverSession: true,
                    }
                },
                address: true,
                memberships: {
                    orderBy: {
                        role: 'asc',
                    },
                },
                imageUser: true,
            },
        });

        if (!user || !user.driver)
            throw new Error("Sorry, we couldn't find you. Please try again.");

        const { driver, ...userData } = user;

        const
            driverShape = {
                ...user?.driver,
                user: {
                    ...userData
                },
                driverSession: driver.driverSession ? driver.driverSession : null,
            }

        return driverShape
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findDriverWithDetailsById(id: string): Promise<DriverWithDetails | null> {
    try {
        const
            driver = await prisma.driver.findUnique({
                where: {
                    id
                },
                include: {
                    driverSession: true,
                    user: {
                        include: {
                            address: true,
                            imageUser: true,
                        }
                    }
                },
            })

        return driver
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export type DriverWithDetails = Driver & {
    user: User;
    driverSession: DriverSession | null;
}

export type DriverWithSessionDetails = Driver & {
    user: User;
    driverSession: DriverSessionWithJoinedData | null;
}

export type DriverSessionWithJoinedData = DriverSession & {
    currentCoordinates: Coordinates | null;
    isOnline: boolean;
    isActiveDelivery: boolean;
    currentRoute: Route | null;
    routeId: string | null;
}

export type DriverCreateType = Prisma.UserUncheckedCreateWithoutDriverInput & {
    driver: Prisma.DriverUncheckedCreateInput;
    address: (Prisma.AddressCreateWithoutOrganizationInput & {
        coordinates: Prisma.CoordinatesCreateInput
    })[];
    imageUser: Prisma.ImageUserUncheckedCreateWithoutUserInput[];
    memberships: Prisma.MembershipUpsertArgs["create"][];
}