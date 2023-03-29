import { ImageUser, Membership, Prisma, User } from "@prisma/client";
import { OrderWithDetails } from "./order";
export declare function createUser(userData: any): Promise<User & {
    address: import(".prisma/client").Address[];
    imageUser: ImageUser;
    memberships: Membership[];
}>;
export declare function findUserWithDetailsByEmail(email: string): Promise<User & {
    address: import(".prisma/client").Address[];
    imageUser: ImageUser;
    memberships: Membership[];
}>;
export declare function findUserWithDetailsById(id: string): Promise<User & {
    address: import(".prisma/client").Address[];
    imageUser: ImageUser;
    memberships: Membership[];
}>;
export declare function updateUserPasswordToken(email: string, timeLimitedToken: string): Promise<{
    id: string;
    email: string;
}>;
export type UserWithDetails = Omit<User, "createdAt" | "updatedAt"> & {
    address: {
        id?: string;
        street1: string;
        street2: string | null;
        city: string;
        state: string;
        zipcode: string;
        country: string;
        countryCode: string | null;
        userId?: string | null;
        organizationId?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
    }[];
    imageUser?: ImageUser[];
    memberships?: Membership[];
    orders?: OrderWithDetails[];
    preferences?: null;
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
//# sourceMappingURL=user.d.ts.map