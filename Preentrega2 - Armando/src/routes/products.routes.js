import { Router} from "express";
import Productcontroller from "../controllers/product.controller.js";

const router = Router()

router.get('/', Productcontroller.getProducts)
router.post('/', Productcontroller.addProducts)
router.get('/:pid', Productcontroller.getProductsById)
router.put('/:pid', Productcontroller.updateProducts)
router.delete('/:pid', Productcontroller.deleteProducts)

export default router