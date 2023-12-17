import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();

// '/' POST createUser
router.route('/').post(userCtrl.createUser);
// '/staff' POST createDispensaryStaff
router.route('/staff').post(userCtrl.createDispensaryStaff);

// '/' PUT updateUser
router.route('/').put(userCtrl.updateUser);
// '/staff' PUT updateDispensaryStaff
router.route('/staff').put(userCtrl.updateDispensaryStaff);

// '/:id' GET getUserById
router.route('/:id').get(userCtrl.getUserById);
// '/:id' DELETE deleteUser
router.route('/:id').delete(userCtrl.deleteUser);

// '/:id/address/:addressId' GET getAddressById
router.route('/:id/address/:addressId').get(userCtrl.getAddressById);
// '/address' POST addAddressToUser
router.route('/address').post(userCtrl.addAddressToUser);
// '/:id/address/:addressId' DELETE removeAddressFromUser
router.route('/:id/address/:addressId').delete(userCtrl.removeAddressFromUser);

router.route('/:id/orders').get(userCtrl.getOrdersForUser);

export default router;
