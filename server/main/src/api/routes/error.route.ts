import { Router } from 'express';
const router = Router();

router.route('/badParam/:id').get((req, res) => {
	res.status(404).json('Bad query parameter.');
});
router.route('/500').get((req, res) => {
	res.status(500).json('An error occurred.');
});
router.route('/200WithError').get((req, res) => {
	res.status(200).json('An error occurred.');
});
router.route('/200').get((req, res) => {
	res.status(200).json('ok');
});

export default router;
