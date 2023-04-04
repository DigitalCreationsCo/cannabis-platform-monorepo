import prisma from "./db/prisma";
/*
* Session Data Access functions
*
* findSessionByHandle
* createSession
* updateExpireSession
* deleteSessionByHandle
*/
export async function findSessionByHandle(sessionHandle) {
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
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function createSession(sessionHandle, sessionPayload, expires) {
    try {
        console.log('create session args: ', sessionHandle, sessionPayload, expires);
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
        });
        return session;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function updateExpireSession(sessionHandle, expires) {
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
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function deleteSessionByHandle(sessionHandle) {
    try {
        const data = await prisma.session.delete({
            where: {
                sessionHandle,
            },
        });
        return data;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
//# sourceMappingURL=session.js.map