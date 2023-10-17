import { Router } from "express";
import { createTicket , renderTicket } from "../../controllers/ticket.controller.js";

const router = Router();

router.post("/create", createTicket);

router.get("/:tid", renderTicket)

export default router;