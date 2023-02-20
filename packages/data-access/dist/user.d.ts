import { Address, ImageUser, Membership, User } from "@prisma/client";
export declare function createUser(): Promise<void>;
export declare function findUserWithDetails(id: string): Promise<(User & {
    address: Address[];
    memberships: Membership[];
    imageUser: ImageUser[];
}) | null>;
export type UserWithDetails = User & {
    address: Address[];
    imageUser?: ImageUser[];
    memberships?: Membership[];
};
