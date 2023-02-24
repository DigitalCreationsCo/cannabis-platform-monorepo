import axios from "axios";
import { SessionInformation } from "supertokens-node/recipe/session";
import { urlBuilder } from "../utils";

export type SessionInfo = {
    session: SessionInformation;
    user: any;
    accessTokenPayload: any;
}

export async function getSession(): Promise<SessionInfo | null> {
    console.log('fetching session from backened')
    const {data } = await axios(urlBuilder.next + '/api/session');
    if (data) {
        console.log('session DATA: ', data)
        return data
    }
}