import { Prisma, User, Address, Order, ImageUser, Account, Membership, Review, Session } from "@prisma/client";

/* =================================
Functions

getUserById
getUserOrderHistory

Types
UserSession
EmployeeSession
UserWithDetails
UserWithOrderHistory
UserWithReviews
UserUpdate

================================= */
export async function getUserById() {
}

export async function getUserOrderHistory() {}

export type UserSession = Session
export type EmployeeUserSession = Session & {
    organizationId: string;
}

export type UserData = {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
}
export type EmployeeUserData = UserData & {
    organizationId: string;
}

export type UserWithDetails = User & {
    address: Address;
    imageUser?: ImageUser[];
    accounts?: Account[]
    memberships: Membership[]
}

export type UserWithOrderHistory = User & {
    orders: Order[];
}

export type UserWithReviews = User & {
    reviews: Review[];
}

export type UserUpdate = Prisma.UserUpdateArgs["data"]
