import { Router } from "express";
import ProductRouter from "./products.js"
import CartRouter from "./carts.js"
import ProductsView from "./productView.js"
import CartView from "./cartView.js"

const router = Router()

router.use('/api/products', ProductRouter)
router.use('/api/carts', CartRouter)
router.use('/products', ProductsView)
router.use('/carts', CartView)

export default router