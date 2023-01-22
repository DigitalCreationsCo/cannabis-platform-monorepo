import { signIn } from 'supertokens-node/recipe/emailpassword';
import { UserDA } from '../data-access';
/* =================================
UserController - controller class for user actions

members:
login

getUserDetails

================================= */

export default class UserController {
    static async login(req, res) {
        try {
            let { email, password } = req.body;
            console.log('email: ', email);
            console.log('password: ', password);
            const signInUser = await signIn(email, password);
            res.status(200).json(signInUser);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getUserDetails(req, res) {
        try {
            const id = req.params.id || '';
            const data = await UserDA.getUserDetails(id);
            if (!data) return res.status(404).json('User not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
