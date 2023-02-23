import { Address } from "@prisma/client";
export declare function createOrganization(organization: any, address: any): Promise<import(".prisma/client").Organization>;
export declare function findOrganizationById(organizationId: string): Promise<{}>;
export declare function findUsersByOrganization(organizationId: string): Promise<(import(".prisma/client").User & {
    imageUser: import(".prisma/client").ImageUser[];
    memberships: import(".prisma/client").Membership[];
})[]>;
export type OrganizationCreateType = {
    name: string;
    address: Address;
    dialCode: string;
    phone: string;
    email: string;
    emailVerified?: boolean;
    vendorId: string;
    termsAccepted?: boolean;
    subdomainId: string;
};
