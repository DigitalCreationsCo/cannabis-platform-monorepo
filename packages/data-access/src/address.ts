import { Address, Coordinates } from "@prisma/client";
import prisma from "./db/prisma";

export async function createAddress(address:any) {
    try {
        const createAddress = await prisma.address.create({
            data: address
        })
        return createAddress
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
 }

export async function findAddressById(id: string) {
    try {
        const address = await prisma.address.findUnique({
            where: {
                id
            },
        })
        return address
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function deleteAddressById(id: string) {
    try {
        const deleteAddress = await prisma.address.delete({
            where: {
                id
            },
        })
        return `Address ${deleteAddress?.id} is removed.`
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function removeAddressByIdAndUserId({ addressId, userId }: { addressId: string, userId: string }) {
    try {
        const removeAddress = await prisma.address.update({
            where: {
                id: addressId
            },
            data: {
                user: { disconnect: { id: userId }
                }
            }
        })
        return `Address ${removeAddress?.id} is removed.`
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

// export type AddressCreateType = Prisma.AddressCreateInput
// export type AddressCreateType = Prisma.PromiseReturnType<typeof createAddress>

export type AddressCreateType ={
    id?: string;
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    countryCode: string | null;
    coordinateId?: string;
    coordinates?: CoordinatesCreateType;
    userId?: string | undefined;
    organizationId?: string | undefined;
};

export type AddressUserCreateType = {
    id?: string;
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    countryCode: string | null;
    coordinateId?: string;
    coordinates?: CoordinatesCreateType;
    userId?: string | undefined;
    // ^ userId used to connect with user
}

export type CoordinatesCreateType = {
    id?: string
    latitude: number
    longitude: number
    radius?: number | null
    driverId?: string | null
    createdAt?: Date
    updatedAt?: Date
}

export type AddressWithDetails = Address & { coordinates: Coordinates | null }
export type AddressWithCoordinates = Address & { coordinates: Coordinates }
