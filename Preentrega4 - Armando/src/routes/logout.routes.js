import { Router } from "express";
import { getLogoutController } from "../controllers/logout.controller.js";

const router = Router ();

//GET
router.get("/", getLogoutController);

export default router;