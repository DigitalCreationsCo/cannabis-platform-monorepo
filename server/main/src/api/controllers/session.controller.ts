import { SessionInformation } from "supertokens-node/recipe/session";

/* =================================
Session Controller - controller class for user session

members:
getSession

================================= */

export type SessionInfo = {
    session: SessionInformation;
    user: any;
    accessTokenPayload: any;
}

export default class SessionController {
    static async getSession(req, res) {
        try {
            console.log('getting session from supertokens')
            // await SupertokensNode.verifySession()(req, res, next);
            // return res.status(200).json({
            //     note: "Fetch any data from your application for authenticated user after using verifySession middleware",
            //     session: req.session.getSessionData(),
            //     user: req.session.getUserId(),
            //     accessTokenPayload: req.session.getAccessTokenPayload(),
            // });
            return res.status(200).json({ session: null, user: null, accessTokenPayload: null })
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
