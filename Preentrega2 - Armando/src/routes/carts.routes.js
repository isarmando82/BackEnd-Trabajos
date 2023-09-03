import { Router} from "express";
import Cartcontroller from "../controllers/cart.controller.js";

const router = Router()

router.get('/', Cartcontroller.getCarts)
router.post('/', Cartcontroller.createCarts)
router.get('/:cid', Cartcontroller.getCartsById)
router.put('/:cid', Cartcontroller.updateCart)
router.delete('/:cid', Cartcontroller.deleteAllCartProducts)
router.put('/:cid/products/:pid', Cartcontroller.updateProductQuantity)

export default router