import { Router } from 'express';
import { ComplianceDA } from '../data-access';
const router = Router();
/* =================================
Compliance Routes

"/"                     GET getComplianceSheet

================================= */

router.route('/state=:state').get(async function (req, res) {
	try {
		const { state } = req.params;
		const data = await ComplianceDA.getComplianceSheet({ state });
		if (!data)
			return res.status(404).json({
				success: 'false',
				message: 'Compliance data not found.',
				error: 'Compliance data not found.',
			});
		return res.status(200).json({
			success: 'true',
			payload: data,
		});
	} catch (error: any) {
		console.info('getComplianceData route: ', error.message);
		res.status(500).json({
			success: 'false',
			message: error.message,
			error: error.message,
		});
	}
});

export default router;
