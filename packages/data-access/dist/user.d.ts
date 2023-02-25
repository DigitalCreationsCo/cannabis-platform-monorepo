import { Address, ImageUser, Membership, User } from "@prisma/client";
import { AddressUserCreateType } from "./address";
export declare function createUser(): Promise<void>;
export declare function findUserWithDetailsByEmail(email: string): Promise<(User & {
    address: Address[];
    imageUser: ImageUser[];
    memberships: Membership[];
}) | null>;
export declare function findUserWithDetailsById(id: string): Promise<(User & {
    address: Address[];
    imageUser: ImageUser[];
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
    imageUser: ImageUser[] | null;
    address: AddressUserCreateType;
};
export type UserLoginData = {
    email: string;
    password: string;
};
export type AccessTokenPayload = {
    username: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    memberships: Membership[];
};
