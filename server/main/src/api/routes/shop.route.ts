import { Router } from 'express';
import { shopCtrl } from '../controllers';

const router = Router();
/* =================================
Shop Routes

"/orders/org/:id"   getOrdersByOrg

"/orders/:id"       getOrderById

"/orders"           updateOrderById

"/products/org/:id" getProductsByOrg

"/products/:id"     getProductById

"/products"         searchProducts

================================= */

router.route('/orders/org/:id').get(shopCtrl.getOrdersByOrg);

router.route('/orders/:id').get(shopCtrl.getOrderById);

// router.route("/orders").post(shopCtrl.createOrder)

router.route('/orders').put(shopCtrl.updateOrderById);

router.route('/products/org/:id').get(shopCtrl.getProductsByOrg);

router.route('/products/:id').get(shopCtrl.getProductById);

router.route('/products').post(shopCtrl.searchProducts);

export default router;
