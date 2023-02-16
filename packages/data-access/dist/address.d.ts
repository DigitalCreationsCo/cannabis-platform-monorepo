export declare function createAddress(address: any): Promise<import(".prisma/client").Address>;
export declare function findAddressById(id: string): Promise<import(".prisma/client").Address | null>;
export declare function deleteAddressById(id: string): Promise<string>;
export declare function removeAddressByIdAndUserId({ addressId, userId }: {
    addressId: string;
    userId: string;
}): Promise<string>;
export type AddressCreateType = {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    countryCode: string | null;
    coordinateId?: string;
    userId: string | undefined;
    organizationId: string | undefined;
};
export type AddressUserCreateType = {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    countryCode: string | null;
    coordinateId: string;
    userId: string | undefined;
};
