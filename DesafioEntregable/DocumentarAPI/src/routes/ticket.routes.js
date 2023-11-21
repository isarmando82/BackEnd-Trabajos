import { Router } from 'express';
import { ticketController} from '../controllers/ticket.controller.js';
const router = Router();

router.get("/:tid", ticketController);

export default router;