import { Router } from 'express';
import { shopCtrl } from '../controllers';

const router = Router();

router.route('/orders/org/:id').get(shopCtrl.getOrdersByOrganization);

router.route('/orders/:id').get(shopCtrl.getOrderById);

router.route('/orders').post(shopCtrl.createOrder);

router.route('/orders').put(shopCtrl.updateOrderById);

router.route('/orders-fulfill').post(shopCtrl.fulfillOrder);

router.route('/products/org/:id').get(shopCtrl.getProductsByOrg);

router.route('/products/:id').get(shopCtrl.getProductById);

router.route('/products').post(shopCtrl.searchProducts);

router.route('/test/orders-fulfill').post(shopCtrl.testFulfillmentOrder);

router
	.route('/products&_page=:page&_limit=:limit')
	.post(shopCtrl.getProductsByMultipleOrgs);

export default router;
