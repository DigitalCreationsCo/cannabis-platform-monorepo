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

// get products from an organization
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const user = getUserInfo({ req });
        const { organizationId } = user;
        req.organizationId = organizationId;

        if (cache.has(`products/org/${organizationId}`)) {
            const products = cache.get(`products/org/${organizationId}`);
            return res.status(200).json(products);
        }
        const { data } = await axios(urlBuilder.main.productsByOrgId(organizationId));
        cache.set(`products/org/${organizationId}`, data);
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// search products
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const user = getUserInfo({ req });
        const { organizationId } = user;
        req.organizationId = organizationId;

        const { search } = req.body;
        if (search) {
            const { data } = await axios.post(urlBuilder.main.products(), {
                search,
                organizationId,
            });
            return res.status(res.statusCode).json(data);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
