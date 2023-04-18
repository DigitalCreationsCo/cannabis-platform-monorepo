import { Prisma } from "@prisma/client";
import prisma from "./db/prisma";
/*
* User Data Access functions
*
* createUser
* findUserWithDetailsByEmail
* findUserWithDetailsById
* updateUserPasswordToken
*/
export async function createUser(userData) {
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
            include: { address: true, imageUser: true, memberships: true }
        });
        return user;
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('This user exists already. Please choose a different username or email.');
            }
        }
        throw new Error(error);
    }
}
export async function findUserWithDetailsByEmail(email) {
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
        });
        return user;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function findUserWithDetailsById(id) {
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
        });
        return user;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function updateUserPasswordToken(email, timeLimitedToken) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { passwordResetToken: timeLimitedToken },
            select: { email: true, id: true }
        });
        return user;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
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
