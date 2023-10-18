import { Router } from "express";
import { getLogoutController } from "../controllers/logout.controller.js";

const router = Router ();


router.get("/", getLogoutController);

export default router;