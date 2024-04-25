import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { token } = req.body;
		const { data } = await axios.post(
			`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_V2_SECRET_KEY}&response=${token}`,
		);
		if (data.success) {
			res.status(200).send({ success: 'true', isHuman: true });
		} else {
			res.status(401).send({ success: 'false', isHuman: false });
		}
	} catch (error) {
		console.error('api recaptcha: ', error.message);
		res.status(500).send('Error verifying reCAPTCHA');
	}
});

export default handler;
