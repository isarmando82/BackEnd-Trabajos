import { Router } from 'express';
import { getProductController, authMiddleWareController } from '../controllers/product.controller.js';

const router = Router();


router.get('/', authMiddleWareController, getProductController);

export default router;