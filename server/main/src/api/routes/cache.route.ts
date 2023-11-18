import { Router } from 'express';
import { redisCtrl } from '../controllers';
const router = Router();
/* =================================
Redis Cache Routes

GET "/cart/:token"  getCartCache

POST "/cart"  setCartCache

================================= */

router.route('/cart/:id').get(redisCtrl.getCartCache);

router.route('/cart').post(redisCtrl.setCartCache);

export default router;
