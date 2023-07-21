import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();
const productController = new ProductController();


router.get('/', productController.getAllProducts);
router.get('/:pid', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

export default router;
