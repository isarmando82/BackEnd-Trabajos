import { Router } from 'express';
import { getCartByIdController, postCreateCartController, postAddProductToCartController, putUpdateProductOnCartController, putUpdateProductQuantityController, deleteProductFromCartController, deleteEmptyCartController } from '../controllers/cart.controller.js';   
import { isUserMiddleware } from '../controllers/sessions.controller.js';
const router = Router();


router.get("/:cid", getCartByIdController);
router.post("/", postCreateCartController);
router.post('/:cid/product/:pid', isUserMiddleware, postAddProductToCartController);
router.put('/:cid', putUpdateProductOnCartController);
router.put('/:cid/products/:pid', putUpdateProductQuantityController);
router.delete('/:cid/product/:pid', deleteProductFromCartController);
router.delete('/:cid', deleteEmptyCartController);

export default router;