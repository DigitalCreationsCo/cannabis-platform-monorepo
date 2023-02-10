import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { urlBuilder } from 'utils';

const handler = nc();

// logged in user checker middleware
handler.use(authMiddleware).use(healthCheckMiddleware);

// caching instance
const cache = new NodeCache({ stdTTL: 20 });

// extract this function out, use supertokens
const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } };
    const { user } = session;
    return user;
};

// get users from an organization
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const user = getUserInfo({ req });
        const { organizationId } = user;
        req.organizationId = organizationId;

        if (cache.has(`users/org/${organizationId}`)) {
            const users = cache.get(`users/org/${organizationId}`);
            return res.status(200).json(users);
        }
        const { data } = await axios(urlBuilder.main.usersByOrg(organizationId));
        cache.set(`users/org/${organizationId}`, data);
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
