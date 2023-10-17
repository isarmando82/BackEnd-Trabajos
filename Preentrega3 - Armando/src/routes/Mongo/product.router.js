import express from 'express';
/* import { ProductModel } from '../../services/db/models/productModel.js'; */
import { createProduct, getProducts, getProdById, updateProdById, deleteProdById  } from '../../controllers/product.controller.js';

const router = express.Router();

router.post('/createOne', createProduct );
router.get('/', getProducts);
router.get('/findOne/:pid', getProdById );
router.put('/updateOne/:pid', updateProdById );
router.delete('/deleteOne/:pid', deleteProdById );


export default router;