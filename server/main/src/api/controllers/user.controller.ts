import { AccessTokenPayload } from '@cd/data-access/dist';
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
            const accessTokenPayload:AccessTokenPayload = { id: user.id, username: user.username, email: user.email };
            const session = await STSession.createNewSession(res, accessTokenPayload.id, accessTokenPayload, null, user);
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

    static async signup(req, res) {
        try {
            const createUserData = req.body;
            console.log('createUserData: ', createUserData)
            const user = await UserDA.signup(createUserData);
            // create a data func to save this session.userDataInAccessToken in db
            const accessTokenPayload:AccessTokenPayload = { id: user.id, username: user.username, email: user.email };
            const session = await STSession.createNewSession(res, accessTokenPayload.id, accessTokenPayload, null, user);
            return res.status(200).json(session);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
