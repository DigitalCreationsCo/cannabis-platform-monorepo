import { SessionPayload } from '@cd/data-access/dist';
import STSession from 'supertokens-node/recipe/session';
import { UserDA } from '../data-access';

/* =================================
UserController - controller class for user actions

members:
signin
signout
getUserById
getAddressById
addAddressToUser
removeAddressFromUser
signup

================================= */

export default class UserController {
    static async signin(req, res) {
        try {
            const userLoginData = req.body;
            const user = await UserDA.signin(userLoginData);

            // create a data func to save this session.userDataInAccessToken in db
            const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };

            const session = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user)
            
            // create session here
            
            return res.status(200).json(session);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async signout(req, res) {
        try {
            const session = req.body;
            await UserDA.signout(session);
            return res.status(200);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id || '';
            const data = await UserDA.getUserById(id);
            if (!data) return res.status(404).json('User not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getAddressById(req, res) {
        try {
            const { id = '', addressId = '' } = req.params;
            const data = await UserDA.getAddressById(addressId);
            if (!data) return res.status(404).json('Address not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async addAddressToUser(req, res) {
        try {
            const address = req.body;
            const data = await UserDA.addAddressToUser(address);
            if (!data) return res.status(404).json('Address was not created');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async removeAddressFromUser(req, res) {
        try {
            const { id = '', addressId = '' } = req.params;
            const data = await UserDA.removeAddressFromUser({ addressId, userId: id });
            if (!data) return res.status(404).json('Address not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async signup(req, res):Promise<SessionResponsePayload> {
        try {
            const createUserData = req.body;
            const user = await UserDA.signup(createUserData);

            const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };
            
            const sessionToken = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user);
            
            // future note: drivers will have only session active on a device.
            // Drivers will need their own session function for login
            const session = await UserDA.createUserSession(sessionToken.getHandle(), sessionPayload, await sessionToken.getExpiry())
            return res.status(200).json({
                status: true,
                message: 'Your account is created!',
                session
            });
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}

export type SessionResponsePayload = { status: boolean; message: string; session: any}