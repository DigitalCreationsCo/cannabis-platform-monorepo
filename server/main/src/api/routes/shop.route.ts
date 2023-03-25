import { Router } from 'express';
import { shopCtrl } from '../controllers';

const router = Router();
/* =================================
Shop Routes

"/orders"           createOrder

"/orders/org/:id"   getOrdersByOrg

"/orders/:id"       getOrderById

"/orders"           updateOrderById

"/products/org/:id" getProductsByOrg

"/products/:id"     getProductById

"/products"         searchProducts

================================= */

router.route('/orders/org/:id').get(shopCtrl.getOrdersByOrg);

router.route('/orders/:id').get(shopCtrl.getOrderById);

router.route('/orders').post(shopCtrl.processOrder);

router.route('/orders').put(shopCtrl.updateOrderById);

router.route('/products/org/:id').get(shopCtrl.getProductsByOrg);

router.route('/products/:id').get(shopCtrl.getProductById);

router.route('/products').post(shopCtrl.searchProducts);

router.route('/products&_page=:page&_limit=:limit').post(shopCtrl.getProductsByMultipleOrgs);

export default router;
