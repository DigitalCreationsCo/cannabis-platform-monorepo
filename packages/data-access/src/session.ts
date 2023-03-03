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