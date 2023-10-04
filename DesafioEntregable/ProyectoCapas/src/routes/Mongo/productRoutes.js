import express from 'express';
import { ProductModel } from '../../models/productModel.js';
import { createProduct, getProducts } from '../../controllers/product.controller.js';

const router = express.Router();


router.post('/', createProduct );

router.get('/', getProducts);


export default router;