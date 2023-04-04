import prisma from "./db/prisma";

/*
* Session Data Access functions
*
* findSessionByHandle
* createSession
* updateExpireSession
* deleteSessionByHandle
*/

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

export async function createSession(sessionHandle:string, sessionPayload: SessionPayload, expires:number) {
    try {
        console.log('create session args: ', sessionHandle, sessionPayload, expires)
        const session = await prisma.session.create({
            data: {
                sessionHandle,
                email: sessionPayload.email,
                username: sessionPayload.username,
                expires: new Date(),
                user: {
                    connect: { id: sessionPayload.userId }
                }
            },
        })
        return session;
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
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

export type SessionPayload = {
    username: string;
    userId: string;
    email: string;
}