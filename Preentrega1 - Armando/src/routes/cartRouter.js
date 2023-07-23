import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();
const cartController = new CartController();

router.post('/', cartController.createCart);
router.get('/:cid/products', cartController.getProductsByCartId);
router.post('/:cid/products/:pid', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart); 
router.get('/', cartController.getAllCarts);

export default router;

