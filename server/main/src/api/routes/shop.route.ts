import { Router } from 'express';
import { shopCtrl } from '../controllers';

const router = Router();
/* =================================
Shop Routes

'/orders/org/:id                            getOrdersByOrg

'/orders/:id                                getOrderById

'/orders'                                   createOrder

'/orders                                    updateOrderById

'/orders-fulfill'                           fulfillOrder

'/products/org/:id                          getProductsByOrg

'/products/:id                              getProductById

'/products'                                 searchProducts

'/products&_page=:page&_limit=:limit'       getProductsByMultipleOrgs

================================= */

router.route('/orders/org/:id').get(shopCtrl.getOrdersByOrganization);

router.route('/orders/:id').get(shopCtrl.getOrderById);

router.route('/orders').post(shopCtrl.createOrder);

router.route('/orders').put(shopCtrl.updateOrderById);

router.route('/orders-fulfill').post(shopCtrl.fulfillOrder);

router.route('/products/org/:id').get(shopCtrl.getProductsByOrg);

router.route('/products/:id').get(shopCtrl.getProductById);

router.route('/products').post(shopCtrl.searchProducts);

router
	.route('/products&_page=:page&_limit=:limit')
	.post(shopCtrl.getProductsByMultipleOrgs);

export default router;
