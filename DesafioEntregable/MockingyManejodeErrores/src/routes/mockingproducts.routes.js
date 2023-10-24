import { Router } from 'express';
import { getMockingProductsController } from '../controllers/mockingproducts.controller.js';
const router = Router();

//GET
router.get('/', getMockingProductsController);


export default router;