import { Address, CategoryList, Coordinates, ImageOrganization, Prisma, Schedule } from "@prisma/client";
export declare function createOrganization(organization: OrganizationCreateType): Promise<import(".prisma/client").Organization>;
export declare function findOrganizationById(organizationId: string): Promise<{}>;
export declare function findUsersByOrganization(organizationId: string): Promise<(import(".prisma/client").User & {
    imageUser: import(".prisma/client").ImageUser;
    memberships: import(".prisma/client").Membership[];
})[]>;
export declare function findOrganizationBySubdomain(subdomainId: string): Promise<{}>;
export declare function findLocalOrganizationsById(organizationIds: string[]): Promise<(import(".prisma/client").Organization & {
    address: Address;
    categoryList: CategoryList;
    siteSetting: import(".prisma/client").SiteSetting;
    images: ImageOrganization[];
    products: import(".prisma/client").Product[];
})[]>;
export declare function updateOrganizationRecord(id: string, data: Prisma.OrganizationUpdateArgs['data']): Promise<import(".prisma/client").Organization>;
export declare function updateStripeAccountDispensary(id: string, stripeAccountId: string, accountParams?: {}): Promise<import(".prisma/client").Organization>;
export type OrganizationCreateType = {
    id: string | undefined;
    name: string;
    address: Address & {
        coordinates: Coordinates;
    };
    dialCode: string;
    phone: string;
    email: string;
    emailVerified?: boolean;
    vendorId: string;
    termsAccepted?: boolean;
    coordinates?: Coordinates;
    subdomainId: string;
};
export type OrganizationWithShopDetails = {
    id: string;
    name: string;
    address: Address & {
        coordinates: Coordinates;
    };
    dialCode: string;
    phone: string;
    email: string;
    emailVerified?: boolean;
    vendorId: string;
    termsAccepted?: boolean;
    subdomainId: string;
    images: ImageOrganization[];
    categoryList: CategoryList[];
    schedule: Schedule;
};
export type OrganizationStripeDetail = {
    id: string;
    stripeAccountId: string;
};
export type ServeUserProximity = {
    userLocation: Coordinates;
    proximityRadius: number;
};
//# sourceMappingURL=organization.d.ts.map