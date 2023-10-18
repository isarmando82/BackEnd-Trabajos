
import { cartManager, ticketManager }  from '../services/factory.js';

const getCartByIdController = async (req, res) => {
    const cartId = req.params.cid;
    const carrito = await cartManager.getCartById(cartId);
    if (carrito) {
        res.render('carts', { carrito: carrito.products, cartId: cartId });
    } else {
        res.set('Content-Type', 'application/json');
        res.status(404);
        res.send('{"status":"failed", "message":"Cart not found"}');
    }
}

const getPurchaseCart = async (req, res) => {
    const cartId = req.params.cid;
    const user = req.session.user;
    if (cartId) {
        let ticket = await ticketManager.createTicket(cartId, user);
        ticket = JSON.parse(ticket);
        if (ticket.ticketId) {
            res.redirect('/ticket/' + ticket.ticketId)
        } else {
            res.send(ticket);
        }
    } else {
        res.status(404);
    }
}

export {
    getCartByIdController, getPurchaseCart
}