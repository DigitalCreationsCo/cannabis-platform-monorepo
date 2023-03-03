import { findSessionByHandle } from '@cd/data-access';

/* =================================
Session Data Access - data class for Session table

members: 
getSession
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
}
