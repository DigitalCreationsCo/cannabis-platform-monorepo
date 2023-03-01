import { UserWithDetails } from '@cd/data-access';
import axios from 'axios';
import { SessionInformation } from 'supertokens-node/recipe/session';
import { urlBuilder } from '../utils';

export type SessionInfo = {
    session: SessionInformation;
    user: UserWithDetails;
    accessTokenPayload: unknown;
};

export async function getSession(): Promise<SessionInfo | null> {
    const { data } = await axios(urlBuilder.next + '/api/session');
    console.log('get Session: ', data);
    if (data) {
        return data;
    } else {
        return null;
    }
}
