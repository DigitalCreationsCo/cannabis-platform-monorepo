import { Address, ImageUser, Membership, Prisma, User } from "@prisma/client";
import prisma from "./db/prisma";

export async function createUser(userData: UserCreateType) {
    try {
        const user = await prisma.user.create({
            data: {
                ...userData,
                termsAccepted: Boolean(userData.termsAccepted),
                address: { create: userData.address }, 
                imageUser: { create: userData.imageUser}
            }
        })
        return user;
    } catch (error:any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findUserWithDetailsByEmail(email: string) {
    try {
        console.log('email data param: ', email)
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

export type UserWithDetails = User & {
    address: Address[];
    imageUser?: ImageUser[];
    memberships?: Membership[];
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

export type AccessTokenPayload = {
    username: string;
    id: string;
    email: string;
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
