import { signIn } from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { Error as SuperTokensError } from 'supertokens-node';

/* =================================
UserController - controller class for user actions

members:
verifySession
login

================================= */

export default class UserController {
    static async verifySession(req, res) {
        // try {
        //     const session = await Session.getSession(req, res, {
        //         overrideGlobalClaimValidators: () => {
        //             // this makes it so that no custom session claims are checked
        //             return [];
        //         },
        //     });
        //     const userId = session.getUserId();
        //     console.log('backend, userId: ', userId);
        //     res.status(200).json(session);
        // } catch (error) {
        //     if (SuperTokensError.isErrorFromSuperTokens(error)) {
        //         if (error.type === Session.Error.TRY_REFRESH_TOKEN || error.type === Session.Error.UNAUTHORISED) {
        //             res.redirect('/refresh-session?redirectBack=/dashboard');
        //         } else {
        //             res.status(400).json({ error });
        //         }
        //     } else {
        //         res.status(500).json({ error });
        //     }
        //     console.log('API error: ', error);
        //     res.status(500).json({ error });
        // }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
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
