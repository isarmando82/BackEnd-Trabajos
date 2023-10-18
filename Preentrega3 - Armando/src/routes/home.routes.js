import { Router } from 'express';
import { getHomeRenderController } from '../controllers/home.controller.js';
const router = Router();


router.get('/', getHomeRenderController);

export default router