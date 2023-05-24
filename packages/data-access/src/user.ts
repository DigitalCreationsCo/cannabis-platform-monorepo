import { ImageUser, Membership, MembershipRole, Prisma, User } from "@prisma/client";
import { AddressUserCreateType, AddressWithDetails } from "./address";
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
        const { coordinates, coordinateId, ...addressData } = userData.address[0]
        const user = await prisma.user.create({
            data: {
                email: userData.email,
                emailVerified: false,
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                passwordHash: userData.passwordHash,
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
            },
        })
        
        console.log('user created: ', user.email)
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

export async function updateUser(userData: UserCreateType) {
    try {
        const { coordinateId, coordinates, ...addressData } = userData.address[0]

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
                passwordHash: userData.passwordHash || '',
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
                passwordHash: userData.passwordHash,
                termsAccepted: true,
                dialCode: userData.dialCode,
                phone: userData.phone,
                address: {
                    create: [
                        {...addressData},
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
                // imageUser: userData?.imageUser?.length >= 1  ? {
                //     create: {
                //         ...userData.imageUser
                //     }
                // } : undefined,
            },
            update: {
                email: userData.email,
                emailVerified: false,
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                passwordHash: userData.passwordHash,
                termsAccepted: true,
                dialCode: userData.dialCode,
                phone: userData.phone,
                address: {
                    create: [
                        {...addressData},
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
                    }: {
                        create: {
                            role: createParams["role"] as MembershipRole,
                            organizationId: createParams["dispensaryId"],
                        }
                    },
                // imageUser: userData?.imageUser?.length >= 1  ? {
                //     connectOrCreate: {
                //         where: {
                //             id: userData?.imageUser?.[0].id ?? undefined,
                //         },
                //         create: {
                //             ...userData.imageUser?.[0]
                //         }
                //     }
                // } : undefined,
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
                passwordHash: userData.passwordHash || '',
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
                imageUser: userData.imageUser ? {
                    create: {
                        ...userData.imageUser
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
                    }: {
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
                imageUser: true,
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
                imageUser: true,
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
                    imageUser: true,
                },
        })
        return user
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function updateUserPasswordToken(email: string, timeLimitedToken: string) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { passwordResetToken: timeLimitedToken },
            select: { email: true, id: true }
        });
        return user;
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

export type UserCreateType = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    passwordHash?: string;
    passwordResetToken?: string;
    // password: string;
    // re_password: string;
    phone: string;
    dialCode: string;
    termsAccepted: boolean;
    imageUser: ImageUser[] | null;
    idFrontImage?: string;
    idBackImage?: string;
    isLegalAge: boolean | null;
    idVerified: boolean;
    isSignUpComplete: boolean;
    address: AddressUserCreateType[]
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

// export type UserCreateType = Prisma.PromiseReturnType<typeof createUser>
// export type UserWithDetails = Prisma.PromiseReturnType<typeof findUserWithDetails>

// type UserWithDetails = (User & {
//     address: Address[];
//     imageUser: ImageUser[];
//     memberships: Membership[];
// }) | null

// export type OrderWithDetails = Order & {
//     driver: Driver | null;
//     items?: OrderItemWithDetails[];
//     customer: User;
//     deliveryInfo: Address;
//     updatedAt?: any;
// }

// export type OrderItemWithDetails = OrderItem & {
//     productVariant: ProductVariantWithDetails
//     }
// export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
