import { deleteSessionByHandle, findSessionByHandle, updateExpireSession } from '@cd/data-access';

/* =================================
Session Data Access - data class for Session table

members: 
getSession
deleteSession

================================= */

export default class SessionDA {
    static async getSession(handle:string) {
        try {
            const data = await findSessionByHandle(handle);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    static async updateExpireSession(handle:string, expires: number) {
        try {
            const data = await updateExpireSession(handle, expires);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    static async deleteSession(handle:string) {
        try {
            const data = await deleteSessionByHandle(handle);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
