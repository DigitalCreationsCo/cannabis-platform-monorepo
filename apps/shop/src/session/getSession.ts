import { SessionPayload, User, UserWithDetails } from '@cd/data-access';
import { NextApiRequest } from 'next';
import { SessionInformation } from 'supertokens-node/recipe/session';

type SessionInfo = {
    session: SessionInformation;
    user: UserWithDetails;
    accessTokenPayload: SessionPayload;
};

export type ExtendRequest = NextApiRequest & {
    session?: SessionInformation;
    user?: User;
    organizationId?: string;
};

// export async function getSession({ req }: any): Promise<SessionInfo | null> {
export async function getSession({ req }: any) {
    try {
        // const { data } = await axios(urlBuilder.next + '/api/session', {
        //     headers: {
        //         Cookie: req.headers.cookie
        //     }
        // });
        // if (data.status) {
        //     return data;
        // } else throw new Error(data.error);
    } catch (error: any) {
        console.log('get session error: ', error);
        throw new Error(error.message);
    }
}
