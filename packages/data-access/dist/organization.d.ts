export declare function findOrganizationById(organizationId: string): Promise<{}>;
export declare function findUsersByOrganization(organizationId: string): Promise<(import(".prisma/client").User & {
    imageUser: import(".prisma/client").ImageUser[];
    memberships: import(".prisma/client").Membership[];
})[]>;
