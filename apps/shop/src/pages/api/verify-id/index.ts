import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { NextRequest } from 'next/server';

const handler = nc();

handler.post(async (req:NextRequest, res:NextApiResponse) => {
    try {
        console.log('next api: verify-id route')
        const formData = req.body;
        console.log('api/verify-id request to ', urlBuilder.image.verifyIdentificationImage())
        const { data } = await axios.post(urlBuilder.image.verifyIdentificationImage(), 
        formData, {
                headers: {
                "Content-Type": `multipart/form-data;`,
            }
        });
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb' // Set desired value here
        }
    }
}