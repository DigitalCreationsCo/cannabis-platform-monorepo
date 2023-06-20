import { urlBuilder } from '@cd/core-lib';
import { SessionPayload, UserWithDetails } from '@cd/data-access';
import axios from 'axios';
import { SessionInformation } from 'supertokens-node/recipe/session';

type SessionInfo = {
    session: SessionInformation;
    user: UserWithDetails;
    accessTokenPayload: SessionPayload;
};

export async function getSession({ req, res }: { req: any; res: any }): Promise<SessionInfo | null> {
    try {
        const { data } = await axios(urlBuilder.dashboard + '/api/session', {
            headers: {
                Cookie: req.headers.cookie
            }
        });
        if (data.status) {
            return data;
        } else throw new Error(data.error);
    } catch (error: any) {
        console.log('get session error: ', error);
        throw new Error(error.message);
    }
}
