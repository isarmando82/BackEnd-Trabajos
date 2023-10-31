import { Router } from "express";
import { getLoginController, getRegisterController, getProfileController } from "../controllers/users.views.controller.js";
const router = Router ();

router.get("/login", getLoginController);
router.get("/register", getRegisterController);
router.get("/profile", getProfileController);

export default router;