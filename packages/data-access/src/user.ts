import { Address, ImageUser, Membership, User } from "@prisma/client";
import prisma from "./db/prisma";

export async function createUser() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
 }

export async function findUserWithDetails(id: string) {
    try {
        const user = (await prisma.user.findUnique({
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
        })) || null
        return user
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
