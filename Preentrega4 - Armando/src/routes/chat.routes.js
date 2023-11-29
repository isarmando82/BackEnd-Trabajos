import { Router } from 'express';

import { getRenderChatController, postNewChatController } from '../controllers/chat.controller.js';
import { isUserMiddleware } from '../controllers/sessions.controller.js';

const router = Router();

//GET
router.get('/', isUserMiddleware, getRenderChatController);

//POST
router.post('/newChat', postNewChatController);

export default router