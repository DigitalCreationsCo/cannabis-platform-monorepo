import { ImageUser, Membership, Prisma, User } from "@prisma/client";
import prisma from "./db/prisma";
import { OrderWithDetails } from "./order";

/*
* User Data Access functions
*
* createOrUpdateUser
* findUserWithDetailsByEmail
* findUserWithDetailsById
* updateUserPasswordToken
*/

export async function createOrUpdateUser(userData: UserCreateType) {
    try {
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
                    connectOrCreate: {
                        where: { id: userData.address.id },
                        create: { ...userData.address },
                    }
                },
                imageUser: userData.imageUser ? {
                    create: {
                        ...userData.imageUser
                    }
                } : undefined,
                memberships: {
                    create: {
                        
                    }
                }
            },
            update: {
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
                        ...userData.address
                    }
                } : undefined,
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
        
        console.log('user created or updated: ', user.email)
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

export async function createDispensaryAdmin(userData: UserCreateType) {
    try {
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
                    connectOrCreate: {
                        where: { id: userData.address.id },
                        create: { ...userData.address },
                    }
                },
                imageUser: userData.imageUser ? {
                    create: {
                        ...userData.imageUser
                    }
                } : undefined,
                memberships: {
                    create: {
                        
                    }
                }
            },
            update: {
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
                        ...userData.address
                    }
                } : undefined,
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
        
        console.log('user created or updated: ', user.email)
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
                address: true,
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
                address: true,
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
                    address: true,
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
    address: {
        id?: string
        street1: string
        street2: string | null
        city: string
        state: string
        zipcode: string
        country: string
        countryCode: string | null
        userId?: string | null
        organizationId?: string | null
        createdAt?: Date
        updatedAt?: Date
    }[];
    imageUser?: ImageUser[] | null
    memberships?: Membership[] | null
    orders?: OrderWithDetails[]
    preferences?: null
}

export type UserCreateType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    passwordHash: string;
    // password: string;
    // re_password: string;
    phone: string;
    dialCode: string;
    termsAccepted: boolean;
    imageUser: Prisma.ImageUserCreateArgs[ "data" ] | null;
    isLegalAge: boolean;
    idVerified: boolean;
    address: Prisma.AddressCreateArgs[ "data" ];
}

export type UserLoginData = {
    email: string;
    password: string;
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
