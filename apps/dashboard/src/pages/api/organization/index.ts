import { urlBuilder } from '@cd/core-lib';
import { OrganizationCreateType } from '@cd/data-access';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// create organization, create location record, create stripe account
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const
            organization: OrganizationCreateType = req.body;
        const
            response = await axios.post(urlBuilder.main.organization(), organization, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        return response;
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

// update organization prisma record, update mongodb location record
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const formData: OrganizationCreateType = req.body;
        const response = await axios.put(urlBuilder.main.organization(), formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
