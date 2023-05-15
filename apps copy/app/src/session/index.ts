import { SessionPayload, UserWithDetails } from '@cd/data-access';
import axios from 'axios';
import { SessionInformation } from 'supertokens-node/recipe/session';
import { urlBuilder } from '../utils';

type SessionInfo = {
    session: SessionInformation;
    user: UserWithDetails;
    accessTokenPayload: SessionPayload;
};

export async function getSession({ req, res }): Promise<SessionInfo | null> {
    try {
        const { data } = await axios(urlBuilder.next + '/api/session', {
            headers: {
                Cookie: req.headers.cookie
            }
        });
        if (data.status) {
            return data;
        } else throw new Error(data.error);
    } catch (error) {
        console.log('get session error: ', error);
        throw new Error(error.message);
    }
}
