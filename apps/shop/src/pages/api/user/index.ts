// import { ExtendRequest } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
// import { getSession } from '../../../src/session';

type ExtendRequest = {}

const cache = new NodeCache({ stdTTL: 20 });
const handler = nc();
// handler.use(authMiddleware).use(healthCheckMiddleware);
// get users from an organization
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        // const { user } = await getSession({ req, res });
        // const { organizationId } = user.memberships[0];
        // req.organizationId = organizationId;
        // if (cache.has(`users/org/${organizationId}`)) {
        //     const users = cache.get(`users/org/${organizationId}`);
        //     return res.status(200).json(users);
        // }
        // const { data } = await axios(urlBuilder.main.usersByOrg(organizationId));
        // cache.set(`users/org/${organizationId}`, data);
        // return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

// create a user record
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        // const user: UserCreateType = req.body;
        
        // let response = await axios.post(urlBuilder.main.user(), user, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        // console.log('next api response from server: user: ', response)
        
        // return res.status(response.status).json(response.data);
        
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

// update a user record
handler.put(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        // const updateUser: UserCreateType = req.body;
        
        // const { data } = await axios.put(urlBuilder.main.user(), updateUser, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        
        // return res.status(res.statusCode).json(data);
        
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
