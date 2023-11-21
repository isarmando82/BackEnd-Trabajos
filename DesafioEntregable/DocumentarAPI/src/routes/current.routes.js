import { Router } from 'express';
import { getCurrentController, getUpdateUserController, putUpdateUserController, deleteUserController } from '../controllers/current.controller.js';
import { isAdminMiddleware } from '../controllers/sessions.controller.js';

const router = Router();

//GET
router.get("/", isAdminMiddleware, getCurrentController);
router.get("/:uid/update", isAdminMiddleware, getUpdateUserController);

//PUT
router.put("/:uid/update", isAdminMiddleware, putUpdateUserController);

//DELETE
router.delete("/:uid/delete", isAdminMiddleware, deleteUserController);

export default router;