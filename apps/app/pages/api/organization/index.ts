import { OrganizationCreateType } from '@cd/data-access';
import { urlBuilder } from '@cd/shared-lib';
import axios from 'axios';
import { ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
handler.use(healthCheckMiddleware);

// create organization
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const formData: OrganizationCreateType = req.body;
        const { data } = await axios.post(urlBuilder.main.organization(), formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
