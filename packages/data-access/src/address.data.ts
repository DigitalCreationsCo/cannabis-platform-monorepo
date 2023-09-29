import { type Address, type Coordinates } from '@prisma/client';
import prisma from './db/prisma';

export async function createAddress(address: any) {
	try {
		return await prisma.address.create({
			data: address,
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function addAddressToUser(
	userId: string,
	address: Address & { coordinates: Coordinates },
) {
	try {
		return await prisma.address.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
				street1: address.street1,
				street2: address.street2,
				city: address.city,
				state: address.state,
				zipcode: address.zipcode,
				country: address.country,
				countryCode: address.countryCode,
				coordinates: {
					create: {
						latitude: Number(address.coordinates.latitude),
						longitude: Number(address.coordinates.longitude),
					},
				},
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function findAddressById(id: string) {
	try {
		return await prisma.address.findUnique({
			where: {
				id,
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function deleteAddressById(id: string) {
	try {
		const deleteAddress = await prisma.address.delete({
			where: {
				id,
			},
		});
		return `Address ${deleteAddress?.id} is removed.`;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function removeAddressByIdAndUserId({
	addressId,
	userId,
}: {
	addressId: string;
	userId: string;
}) {
	try {
		const removeAddress = await prisma.address.update({
			where: {
				id: addressId,
			},
			data: {
				user: {
					disconnect: { id: userId },
				},
			},
		});
		return `Address ${removeAddress?.id} is removed.`;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}
