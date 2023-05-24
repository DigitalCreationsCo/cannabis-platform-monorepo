import { Driver, DriverSession, User } from "@prisma/client";
import prisma from "./db/prisma";

/*
* Driver Data Access functions
*
* findDriverWithDetailsByEmail
* findDriverWithDetailsByPhone
* findDriverWithDetailsById
*/

// export async function createDriver(data: DriverCreateType) {
//     try {
//         const { coordinates, coordinateId, ...addressData } = userData.address[0]
//         const user = await prisma.user.create({
//             data: {
//                 email: userData.email,
//                 emailVerified: false,
//                 username: userData.username,
//                 firstName: userData.firstName,
//                 lastName: userData.lastName,
//                 passwordHash: userData.passwordHash,
//                 termsAccepted: true,
//                 dialCode: userData.dialCode,
//                 phone: userData.phone,
//                 address: {
//                     create: { 
//                         ...addressData,
//                         coordinates: {
//                             create: {
//                                 latitude: Number(coordinates?.latitude),
//                                 longitude: Number(coordinates?.longitude)
//                             }
//                         }
//                     },
//                 },
//                 imageUser: userData.imageUser ? {
//                     create: {
//                         ...userData.imageUser
//                     }
//                 } : undefined,
//             },
//         })
        
//         console.log('user created: ', user.email)
//         return user;
//     } catch (error: any) {
//         if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             if (error.code === 'P2002') {
//                 throw new Error('This user exists already. Please choose a different username or email.')
//             }
//           }
//         throw new Error(error)
//     }
// }

// export async function updateDriver(data: DriverCreateType) {
//     try {
//         const { coordinateId, coordinates, ...addressData } = userData.address[0]

//         const user = await prisma.user.update({
//             where: {
//                 email: userData.email,
//             },
//             data: {
//                 email: userData.email,
//                 emailVerified: false,
//                 username: userData.username,
//                 firstName: userData.firstName,
//                 lastName: userData.lastName,
//                 passwordHash: userData.passwordHash || '',
//                 termsAccepted: true,
//                 dialCode: userData.dialCode,
//                 phone: userData.phone,
//                 address: {
//                     create: {
//                         ...addressData,
//                         coordinates: coordinates?.id ? {
//                             connectOrCreate: {
//                                 where: {
//                                     id: coordinates?.id,
//                                 },
//                                 create: {
//                                     latitude: Number(coordinates?.latitude),
//                                     longitude: Number(coordinates?.longitude),
//                                 }
//                             }
//                         } : {
//                             create: {
//                                 latitude: Number(coordinates?.latitude),
//                                 longitude: Number(coordinates?.longitude),
//                             }
//                         }
//                     }
//                 },
//                 imageUser: userData.imageUser ? {
//                     create: {
//                         ...userData.imageUser
//                     }
//                 } : undefined,
//                 memberships: userData.memberships ? {
//                     create: userData.memberships
//                 } : undefined,
//             }
//         })
        
//         console.log('user updated: ', user.email)
//         return user;
//     } catch (error: any) {
//         if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             if (error.code === 'P2002') {
//                 throw new Error('This user exists already. Please choose a different username or email.')
//             }
//           }
//         throw new Error(error)
//     }
// }

export async function findDriverWithDetailsByEmail(email: string): Promise<DriverWithDetails | null> {
    try {
        const user = await prisma.driver.findUnique({
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
        return user
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

// export async function findDriverWithDetailsByPhone(phone: string): Promise<UserWithDetails | null> {
//     try {
        // const user = await prisma.driver.findUnique({
        //     where: {
        //         phone
        //     },
        //     include: {
        //         address: true,
        //         memberships: {
        //             orderBy: {
        //                 role: 'asc',
        //             },
        //         },
        //         imageUser: true,
        //     },
        // })
        // return user
//     } catch (error: any) {
//         console.error(error)
//         throw new Error(error)
//     }
// }

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

// export type UserCreateType = {
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     emailVerified: boolean;
//     passwordHash?: string;
//     // password: string;
//     // re_password: string;
//     phone: string;
//     dialCode: string;
//     termsAccepted: boolean;
//     imageUser: ImageUser[] | null;
//     isLegalAge: boolean;
//     idVerified: boolean;
//     address: AddressUserCreateType[]
//     memberships: Prisma.MembershipUpsertArgs["create"][];
// }

// export type UserLoginData = {
//     email: string;
//     password: string;
// }

// export type CreateUserParams = {
//     role: string;
//     dispensaryId: string;
// }

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
