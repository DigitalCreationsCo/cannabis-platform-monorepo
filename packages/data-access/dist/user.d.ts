import { Address, ImageUser, Membership, User } from "@prisma/client";
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
