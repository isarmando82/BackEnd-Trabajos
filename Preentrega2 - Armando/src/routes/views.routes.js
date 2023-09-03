import { Router} from "express";
import Productcontroller from "../controllers/product.controller.js";
import Cartcontroller from "../controllers/cart.controller.js";

const router = Router()

router.get('/products', Productcontroller.viewProducts)
router.get('/products/:pid', Productcontroller.viewProductsById)
router.get('/carts/:cid', Cartcontroller.viewCartProducts)


export default router