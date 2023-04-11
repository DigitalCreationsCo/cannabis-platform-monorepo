export declare function formatDispensaryUrl(subdomainId: string): string;
export declare const urlBuilder: {
    next: string;
    main: {
        baseUrl: string;
        healthCheck: () => string;
        getSession: () => string;
        ordersByOrgId: (id: any) => string;
        orderById: (id: any) => string;
        orders: () => string;
        productsByOrgId: (id: any) => string;
        productById: (id: any) => string;
        products: () => string;
        productUpdate: (id: any) => string;
        productsByMultipleOrgs: (page: number, limit: number) => string;
        organization: () => string;
        organizationById: (id: any) => string;
        categoryList: (id: any) => string;
        signin: () => string;
        signup: () => string;
        signout: () => string;
        userById: (id: any) => string;
        usersByOrg: (id: any) => string;
        address: () => string;
        addressByIdAndUser: (addressId: any, id: any) => string;
    };
    location: {
        baseUrl: string;
        organizationsLocal: () => string;
        createorganizationLocationRecord: () => string;
    };
    payment: {
        baseUrl: string;
        purchase: () => string;
        createDispensaryAccount: () => string;
    };
};
export default urlBuilder;
