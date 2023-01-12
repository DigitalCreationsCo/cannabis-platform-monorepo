import { NextApiRequest, NextApiResponse } from 'next';
import { EmployeeUserData, EmployeeUserSession, User } from '@cd/data-access';
import { SessionInformation } from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { SessionRequest } from 'supertokens-node/framework/express';
// import { getToken } from 'next-auth/jwt';

export type ExtendRequest = NextApiRequest & {
    session: SessionInformation;
    user: EmployeeUserData;
};

const getSession = (req) => {
    try {
        const session = req.session;
        return session;
    } catch (error) {
        return Error('no session found. Did you forget to sign in?');
    }
};

const getUserFromSession = (req) => {
    try {
        const session = getSession(req);
        // const user:EmployeeUserSession = session.user
        const user: EmployeeUserData = {
            id: '1',
            username: 'kbarnes',
            firstName: 'Katie',
            lastName: 'Barnes',
            organizationId: '2',
            email: 'kb@gmail.com',
        };
        if (typeof user !== undefined) {
            return user;
        } else {
            throw Error('no user credentials found. Could not continue this request.');
        }
    } catch (error) {
        throw Error('no user session found! Something else happened.');
    }
};

// extract this function out, use supertokens
function getUserInfoFromAccessToken(req) {
    return {
        user: getUserFromSession(req),
        session: getSession(req),
    };
}

// what does this middleware do?
// this middleware, will get userdata from ss stored jwt access token,
// it will add the user data to request, which will be used in the following api call,
// this way, any metadata (id, organizationId, etc) is available for the backend data requests
export default async function authMiddleware(req: ExtendRequest, res: any, next: Function) {
    try {
        const { user } = getUserInfoFromAccessToken(req);
        req.user = user;
        console.log('auth middleware');
        // console.log('auth middleware user: ', user);
        
        // await verifySession()(req, res, next());
        // const userId = req?.session?.getUserId();
        // let userInfo = await EmailPassword.getUserById({userId})
        next();
    } catch (error) {
        throw new Error(error.message);
    }
}
