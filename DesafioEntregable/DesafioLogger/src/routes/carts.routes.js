import { Router } from 'express';
import { getCartByIdController, getPurchaseCart } from '../controllers/carts.controller.js';
import { isUserMiddleware } from '../controllers/sessions.controller.js';

const router = Router();


router.get('/:cid', isUserMiddleware, getCartByIdController);
router.get('/:cid/purchase', getPurchaseCart);


export default router;