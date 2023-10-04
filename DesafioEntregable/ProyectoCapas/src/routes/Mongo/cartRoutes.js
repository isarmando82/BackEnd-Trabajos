import express from 'express';
import { creatNewCart, searchCart, putProductToCart, deleteProductFromCart, cleanCart } from '../../controllers/cart.controller.js';

const router = express.Router();

router.post('/', creatNewCart);
router.get ('/:cid', searchCart);
router.put('/:cid/products', putProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid/clean', cleanCart);


export default router;