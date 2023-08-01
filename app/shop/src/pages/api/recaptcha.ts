import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { ExtendRequest } from '../../session/getSession';

const handler = nc();
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const { token, inputVal } = req.body;

        const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_V2_SECRET_KEY}&response=${token}`);

        if (data.success) {
            res.status(200).send({ isHuman: true});
        } else {
            res.status(401).send({ isHuman: false });
        }
    } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
    }
});

export default handler;
