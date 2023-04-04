import prisma from "./db/prisma";
export async function createAddress(address) {
    try {
        const createAddress = await prisma.address.create({
            data: address
        });
        return createAddress;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function findAddressById(id) {
    try {
        const address = await prisma.address.findUnique({
            where: {
                id
            },
        });
        return address;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function deleteAddressById(id) {
    try {
        const deleteAddress = await prisma.address.delete({
            where: {
                id
            },
        });
        return `Address ${deleteAddress?.id} is removed.`;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function removeAddressByIdAndUserId({ addressId, userId }) {
    try {
        const removeAddress = await prisma.address.update({
            where: {
                id: addressId
            },
            data: {
                user: { disconnect: true }
            }
        });
        return `Address ${removeAddress?.id} is removed.`;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
//# sourceMappingURL=address.js.map