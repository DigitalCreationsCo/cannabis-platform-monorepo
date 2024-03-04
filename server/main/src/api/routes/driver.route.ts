import { Router } from 'express';
import { driverCtrl } from '../controllers';
const router = Router();

// POST createDriver
router.route('/').post(driverCtrl.createDriver);
// '/' PUT updateDriver
router.route('/').put(driverCtrl.updateDriver);
// '/:id' GET getDriverById
router.route('/:id').get(driverCtrl.getDriverById);
// '/:id' DELETE deleteDriverById
router.route('/:id').delete(driverCtrl.deleteDriverById);
// '/status' POST updateStatus
router.route('/status').post(driverCtrl.updateStatus);

export default router;
