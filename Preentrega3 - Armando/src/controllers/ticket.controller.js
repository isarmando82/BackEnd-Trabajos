import { ticketService } from "../services/factory.js";

export const createTicket = async (req, res) => {
    const data = req.body.cartId;
    try {
        const response = await ticketService.create(data);
        if (response) {
            res.status(200).json({
                status: "200",
                message: "Ticket creado con éxito con ID: " + response.id,
                payload: response
            });
        }
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};
