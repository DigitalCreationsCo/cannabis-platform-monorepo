import { EmailService } from '@cd/core-lib/src/lib/email/EmailService';
import { Router } from 'express';

const router = Router();
/* =================================
Email Routes

"/new-user"                     POST sendNewUserEmail
"/new-dispensary"               POST sendNewDispensaryEmail
"/new-driver"                   POST sendNewDeliveryPersonEmail

================================= */

router.route('/new-user').post(async function (req, res) {
	try {
		const { subject, header, user } = req.body;
		const newUserEmail = await EmailService.sendNewUserEmail({
			subject,
			header,
			user,
		});
		return res
			.status(200)
			.json({ success: 'true', payload: { ...newUserEmail } });
	} catch (error: any) {
		res.status(500).json({
			success: 'false',
			message: error.message,
		});
	}
});

router.route('/new-dispensary').post(async function (req, res) {
	try {
		const { subject, header, user, organization } = req.body;
		const newUserEmail = await EmailService.sendNewDispensaryEmail({
			subject,
			header,
			user,
			organization,
		});
		return res
			.status(200)
			.json({ success: 'true', payload: { ...newUserEmail } });
	} catch (error: any) {
		res.status(500).json({
			success: 'false',
			message: error.message,
		});
	}
});

router.route('/new-driver').post(async function (req, res) {
	try {
		const { subject, header, user } = req.body;
		const newUserEmail = await EmailService.sendNewDeliveryPersonEmail({
			subject,
			header,
			user,
		});
		return res
			.status(200)
			.json({ success: 'true', payload: { ...newUserEmail } });
	} catch (error: any) {
		res.status(500).json({
			success: 'false',
			message: error.message,
		});
	}
});

export default router;
