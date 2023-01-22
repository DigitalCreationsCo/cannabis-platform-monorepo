import { Address, ImageUser, Membership, User } from "@prisma/client";
import prisma from "./db/prisma";

export async function createUser() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}
 
export async function findUsersByOrg(organizationId) { 
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                memberships: {
                    some: {
                        organizationId,
                    },
                },
            },
            include: {
                memberships: {
                    orderBy: {
                        role: 'asc',
                    },
                },
                imageUser: true,
                address: true,
            },
        })
        return users
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
}
        
export async function findUserWithDetails(id) {
    try {
        const user = await prisma.user.findUnique(
            {
                where: { id },
                include: {
                    address: true,
                    imageUser: true,
                    memberships: true,
                }
            }
        )
        return user
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

// export type UserWithDetails = Prisma.PromiseReturnType<typeof findUserWithDetails>

export type UserWithDetails = User & {
    address: Address[];
    imageUser?: ImageUser[];
    memberships?: Membership[];
}

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
