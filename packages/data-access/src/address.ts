import prisma from "./db/prisma";

// export async function createAddress() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
//  }

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
