import { Address, ImageUser, Membership, Prisma, User } from "@prisma/client";
export declare function createUser(userData: any): Promise<User & {
    address: Address[];
    imageUser: ImageUser | null;
    memberships: Membership[];
}>;
export declare function createSession(sessionHandle: string, sessionPayload: SessionPayload, expires: number): Promise<import(".prisma/client").Session & {
    user: (User & {
        address: Address[];
        imageUser: ImageUser | null;
        memberships: Membership[];
    }) | null;
}>;
export declare function findUserWithDetailsByEmail(email: string): Promise<(User & {
    address: Address[];
    imageUser: ImageUser | null;
    memberships: Membership[];
}) | null>;
export declare function findUserWithDetailsById(id: string): Promise<(User & {
    address: Address[];
    imageUser: ImageUser | null;
    memberships: Membership[];
}) | null>;
export declare function updateUserPasswordToken(email: string, timeLimitedToken: string): Promise<{
    id: string;
    email: string;
}>;
export type UserWithDetails = User & {
    address: Address[];
    imageUser?: ImageUser[];
    memberships?: Membership[];
};
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
    address: Prisma.AddressCreateArgs["data"];
};
export type UserLoginData = {
    email: string;
    password: string;
};
export type SessionPayload = {
    username: string;
    userId: string;
    email: string;
};
