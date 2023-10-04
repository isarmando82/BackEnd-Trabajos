import express from 'express';
import { CartManager } from "../../managers/cartsManager.js";
import * as CartControler from '../../controllers/cartControler.js';


const router = express.Router();

const cartManager = new CartManager();

router.post('/' , async (req, res) => {
    try {
        await cartManager.createCart();
        res.send({ status: 'Success', payload: { id: cartManager.cartId }, message: 'Nuevo carrito creado exitosamente' });
        } catch (error) {
        res.status(500).json({ error: `Error al crear el carrito: ${error.message}` });
        }
        
    });


router.get ('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const id = parseInt(cid);
    const cart = await cartManager.getCartById(id);
    if (cart) {
        res.send({ status: 'Success', payload: cart });
    }else{
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
})

router.post ('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const idCart = parseInt(cid);
    const idProd = parseInt(pid);
    const cart = await cartManager.addProductToCart(idCart, idProd);
    if (cart) {
        res.send({ status: 'Success', payload: cart });
    }else{
        res.status(404).json({ error: 'Carrito no encontrado' });
    }

})

export default router;

