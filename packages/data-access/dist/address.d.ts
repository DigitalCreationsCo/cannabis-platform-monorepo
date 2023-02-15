export declare function findAddressById(id: string): Promise<import(".prisma/client").Address | null>;
export declare function deleteAddressById(id: string): Promise<string>;
export declare function removeAddressByIdAndUserId({ addressId, userId }: {
    addressId: string;
    userId: string;
}): Promise<string>;
