import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { getSession } from '../../../session';

const cache = new NodeCache({ stdTTL: 20 });
const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);
// get users from an organization
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const user = (await getSession({ req, res }))?.user
        const organizationId = user?.memberships?.[0]?.organizationId;
        req.organizationId = organizationId;
        if (cache.has(`users/org/${organizationId}`)) {
            const users = cache.get(`users/org/${organizationId}`);
            return res.status(200).json(users);
        }
        const { data } = await axios(urlBuilder.main.usersByOrg(organizationId));
        cache.set(`users/org/${organizationId}`, data);
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
