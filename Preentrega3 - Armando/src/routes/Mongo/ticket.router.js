import { Router } from "express";
import { createTicket } from "../../controllers/ticket.controller.js";

const router = Router();

router.post("/create", createTicket);

export default router;