import { SessionInformation } from 'supertokens-node/recipe/session';
// import { MailerService } from '../../email/mailerService';
import { createToken, sha265hex } from '../../util/utility';
import { UserDA } from "../data-access";
/* =================================
Session Controller - controller class for user session

members:
getSession
sendPasswordResetTokenEmail
resetPassword
================================= */

export type SessionInfo = {
    session: SessionInformation;
    user: any;
    accessTokenPayload: any;
}

export default class SessionController {
    static async getSession(req, res) {
        try {
                 // await superTokensNextWrapper(
            //     async (next) => {
            //         return await verifySession()(req, res, next);
            //     },
            //     req,
            //     res
            // );
            console.log('getting session from supertokens')
            // let sessionData = req.session?.getSessionData
            // console.log('session data: ', sessionData)
            
            // console.log('Session available?: ', req.session)
            // return res.status(200).json({
            //     note: "Fetch any data from your application for authenticated user after using verifySession middleware",
            //     session: req.session.getSessionData(),
            //     user: req.session.getUserId(),
            //     accessTokenPayload: req.session.getAccessTokenPayload(),
            // });
            // const session = {
            //     user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', memberships: [{ organizationId: '2' }] },
            // };
            // console.log('Session: SERVER: ', req.session)
            const session = {
                user: null
            }
            return res.status(200).json({ session, user: session.user })
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async sendPasswordResetTokenEmail(req, res) {
        try{
            const email = req.body
            const token = createToken();
            const timeLimitedToken = `${sha265hex(token)}#${(Date.now() + Number(process.env.PASSWORD_RESET_EXPIRY_MINS) * 60_000).toString()}`;

            const user = await UserDA.updatePasswordToken(email, timeLimitedToken)

            if (user) {
                // await MailerService.sendEmail(email, 'Reset your password', EmailTemplates.RESET_PASSWORD, {
                //     link: `${appConfig.WEB_DOMAIN}/auth/password-reset?token=${token}`
                // });
            }

            console.log(`User ${user.id} requested password reset`);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
	}
    
    // NOT FINISHED
    static async doResetPassword(req, res) {
        try {
            // const user = await this.prisma.user.findFirst({ where: { passwordResetToken: { startsWith: sha265hex(token) } } });

            // if (user === null || Number.parseInt(user.passwordResetToken?.split('#').at(1) ?? '0', 10) <= Date.now()) {
            //     throw new UnauthorizedException('Invalid token. It may have expired.');
            // }

            // await STSession.revokeAllSessionsForUser(user.id);

            // await this.prisma.user.update({
            //     where: { id: user.id },
            //     data: { passwordHash: await hash(newPassword, appConfig.PASSWORD_SALT_ROUNDS), passwordResetToken: null }
            // });

            // console.log(`User ${user.id} successfully performed password reset`);
            console.log(`User successfully performed password reset`);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
