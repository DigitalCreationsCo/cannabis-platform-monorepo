import { ImageUser, Membership, Prisma, User } from "@prisma/client";
import prisma from "./db/prisma";
import { OrderWithDetails } from "./order";

/*
* User Data Access functions
*
* createUser
* findUserWithDetailsByEmail
* findUserWithDetailsById
* updateUserPasswordToken
*/

export async function createUser(userData: any) {
    try {
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
            },
            include: {address: true, imageUser: true, memberships: true}
        })
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

export async function findUserWithDetailsByEmail(email: string) {
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

export async function findUserWithDetailsById(id: string) {
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

export type UserWithDetails = Omit<User, "createdAt" | "updatedAt"> & {
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
    imageUser?: ImageUser[];
    memberships?: Membership[];
    orders?: OrderWithDetails[]
    preferences?: null
}

export type UserCreateType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    re_password: string;
    phone: string;
    dialCode: string;
    termsAccepted: boolean;
    imageUser: Prisma.ImageUserCreateInput;
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
