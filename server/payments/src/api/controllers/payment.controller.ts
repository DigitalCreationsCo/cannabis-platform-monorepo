import { PaymentDA, StripeDA } from '../data-access';

/* =================================
PaymentController - controller class for payment processing actions

members:

================================= */

export default class UserController {
    // static async signin(req, res) { 
    //     try {
    //         const userLoginData = req.body;
    //         const user = await UserDA.signin(userLoginData);

    //         // create a data func to save this session.userDataInAccessToken in db
    //         const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };

    //         const session = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user)
            
    //         // create session here
            
    //         return res.status(200).json(session);
    //     } catch (error) {
    //         console.log('API error: ', error);
    //         res.status(500).json({ error });
    //     }
    // }

    // untested
    // static async signout(req, res) {
    //     try {
    //         const session = req.body;
    //         await UserDA.signout(session);
    //         return res.status(200);
    //     } catch (error) {
    //         console.log('API error: ', error);
    //         res.status(500).json({ error });
    //     }
    // }

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

    // static async signup(req, res):Promise<SessionResponsePayload> {
    //     try {
    //         // form values from client
    //         const createUserData = req.body;

    //         // create user record in db
    //         const user = await UserDA.createUser(createUserData);

    //         // // access token payload
    //         const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };
            
    //         // // create supertokens session
    //         const sessionToken = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user);
            
    //         // // future note: drivers will have only session active on a device.
    //         // // Drivers will need their own session function for login
    //         const session = await UserDA.createUserSession(sessionToken.getHandle(), sessionPayload, await sessionToken.getExpiry())
            
    //         const signedUp = await signUp(user.email, user.passwordHash, user)
    //         return res.status(200).json({
    //             status: true,
    //             message: 'Your account is created!',
    //             session
    //         });
    //     } catch (error) {
    //         return res.status(200).json({
    //             status: false,
    //             message: error.message,
    //             session: null
    //         });
    //         // if (error.message === 'This user exists already. Please choose a different username or email.') {
    //         //     return res.status(400).json(error)
    //         // }
    //         // console.log('API error: ', error.message);
    //         // return res.status(500).json(error);
    //     }
    // }
    
}

export type SessionResponsePayload = { status: boolean; message: string; session: any}