import prisma from "./db/prisma";
export async function findSessionByHandle(sessionHandle:string) {
    try {
        const data = await prisma.session.findUnique({
            where: {
                sessionHandle,
            },
            include: {
                user: true,
            }
        });
        return data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
}

export async function updateExpireSession(sessionHandle:string, expires: number) {
    try {
        const data = await prisma.session.update({
            where: {
                sessionHandle,
            },
            data: {
                expires: new Date(expires),
            },
        });
        return data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
}

export async function deleteSessionByHandle(sessionHandle:string) {
    try {
        const data = await prisma.session.delete({
            where: {
                sessionHandle,
            },
        });
        return data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
}