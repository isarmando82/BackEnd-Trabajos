import { Router } from 'express';
import { getCurrentController, getUpdateUserController, putUpdateUserController, deleteUserController } from '../controllers/current.controller.js';
import { isAdminMiddleware } from '../controllers/sessions.controller.js';

const router = Router();


router.get("/", isAdminMiddleware, getCurrentController);
router.get("/:uid/update", isAdminMiddleware, getUpdateUserController);
router.put("/:uid/update", isAdminMiddleware, putUpdateUserController);
router.delete("/:uid/delete", isAdminMiddleware, deleteUserController);

export default router;