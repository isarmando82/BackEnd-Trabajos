import { Router } from 'express';
import { getCartByIdController, postCreateCartController, postAddProductToCartController, putUpdateProductOnCartController, putUpdateProductQuantityController, deleteProductFromCartController, deleteEmptyCartController } from '../controllers/cart.controller.js';   
import { isUserMiddleware } from '../controllers/sessions.controller.js';
const router = Router();

/*ROUTER QUE MANEJA LOS CARTS
Se llama desde /api/carts
*/

//GET
router.get("/:cid", getCartByIdController);

//POST
router.post("/", postCreateCartController);
router.post('/:cid/product/:pid', isUserMiddleware, postAddProductToCartController);

//PUT
router.put('/:cid', putUpdateProductOnCartController);
router.put('/:cid/products/:pid', putUpdateProductQuantityController);


//DELETE
router.delete('/:cid/product/:pid', deleteProductFromCartController);
router.delete('/:cid', deleteEmptyCartController);

export default router;