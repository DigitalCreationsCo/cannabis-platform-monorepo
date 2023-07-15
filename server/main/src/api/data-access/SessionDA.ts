import { createSession, deleteSessionByHandle, findSessionByHandle, SessionPayload, updateExpireSession } from '@cd/data-access';

/* =================================
Session Data Access - data class for Session table

members: 
getSession
createUserSession
updateExpireSession
deleteSession

================================= */

export default class SessionDA {
    static async getSession(handle: string) {
        try {
            const data = await findSessionByHandle(handle);
            return data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }

    static async createUserSession(sessionHandle: string, sessionPayload: SessionPayload, expires: number) {
        try {
            console.info('creating user session for user: ', sessionPayload)
            const session = await createSession(sessionHandle, sessionPayload, expires)
            return session;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error);
        }
    }

    static async updateExpireSession(handle: string, expires: number) {
        try {
            console.info('updating session expire for session: ', handle, expires)
            const data = await updateExpireSession(handle, expires);
            return data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }

    static async deleteSession(handle: string) {
        try {
            const data = await deleteSessionByHandle(handle);
            return data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }
}
