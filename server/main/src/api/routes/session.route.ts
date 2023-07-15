import { Router } from 'express';
import { SessionRequest } from 'supertokens-node/framework/express';
import { sessionCtrl } from '../controllers';

const router = Router();
/* =================================
Session Routes

"/"                 getSession

"/password/reset"   sendPasswordResetTokenEmail

"/password/reset"   doResetPassword

================================= */

router.get('/', (req: SessionRequest, res) => {
    try {
        // console.info(' 👋 backend get session here')
        // let sessionData = Session.getSession(req, res);
        // console.info('session data: ', sessionData)

        // console.info('Session available?: ', req.session)
        // return res.status(200).json({
        //     note: "Fetch any data from your application for authenticated user after using verifySession middleware",
        //     session: req.session.getSessionData(),
        //     user: req.session.getUserId(),
        //     accessTokenPayload: req.session.getAccessTokenPayload(),
        // });
        const session = {
            user: {
                username: 'kbarnes',
                firstName: 'Katie',
                lastName: 'Barnes',
                memberships: [{ organizationId: '2' }]
            }
        };
        return res.status(200).json({ session, user: session.user });
    } catch (error: any) {
        console.info('API error: ', error);
        res.status(500).json({ error });
    }
});

router.route('/password/reset').post(sessionCtrl.sendPasswordResetTokenEmail);

router.route('/password/reset/token').post(sessionCtrl.doResetPassword);

export default router;
