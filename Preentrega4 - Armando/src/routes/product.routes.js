import { Router } from 'express';
import { getProductController, authMiddleWareController } from '../controllers/product.controller.js';

const router = Router();

//GET
router.get('/', authMiddleWareController, getProductController);

export default router;