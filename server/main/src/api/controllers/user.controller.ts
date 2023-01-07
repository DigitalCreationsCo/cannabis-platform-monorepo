import { Prisma } from '@prisma/client';
import { signIn, signUp } from 'supertokens-node/recipe/emailpassword';
/* =================================
UserController - controller class for user actions

members:
login

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
}
