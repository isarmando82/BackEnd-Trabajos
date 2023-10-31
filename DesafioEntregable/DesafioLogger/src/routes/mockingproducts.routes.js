import { Router } from 'express';
import { getMockingProductsController } from '../controllers/mockingproducts.controller.js';
const router = Router();


router.get('/', getMockingProductsController);


export default router;