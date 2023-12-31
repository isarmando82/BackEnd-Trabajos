import { Router } from 'express';
import { getRealTimeProductsController } from '../controllers/realtimeproducts.controller.js';
import { isAdminMiddleware } from '../controllers/sessions.controller.js';
const router = Router();

router.get('/', isAdminMiddleware, getRealTimeProductsController);

export default router;