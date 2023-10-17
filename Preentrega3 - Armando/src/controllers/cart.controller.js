import cart from "../services/dao/filesystem/models/cartModel.js";
import {cartService} from "../services/factory.js";

export const creatNewCart = async (req, res)=>{
    const userId = req.body.userId;
    try {
        const body = {
            userId,
            products: [],
        };
        const result = await cartService.createCart(body);
    

    if (cart) {
        res.send({ status: "200", message: "Carrito creado con exito con ID: " + result.id , payload: result})
    }
    
    }catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message }); 
    } 
};

export const searchCart = async (req, res)=>{
    const cid = req.params.cid;
    try {
        const cart = await cartService.getCartById({ _id : cid})

        if (cart) {
            res.send({ status: 'Success', payload: cart });
        } else {
            res.send({ status: '404', message: 'Carrito no encontrado' }); 
        }
    }catch (error) {
        console.error('Error al buscar el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message }); 
    } 
};

export const putProductToCart = async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const cart = await cartService.prodInCart({_id:cid},{_id:pid})
        if (cart) {
            res.send({ status: 'Success', payload: cart });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    } 
};

export const deleteProductFromCart = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const cart = await cartService.deleteProdInCart({ _id: cid }, { _id: pid });
        if (cart) {
            res.send({ status: 'Success', payload: cart });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export const downQuantity = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const cart = await cartService.reduceProdQuantity({ _id: cid }, { _id: pid });
        if (cart) {
            res.send({ status: 'Success', payload: cart });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export const cleanCart = async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cartService.deleteAll({ _id: cid });     
        if (cart) {
            res.send({ status: 'Success', payload: cart });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export const renderCart = async (req, res) => {
    let cid = req.params.cid;
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    try {
        const cartProducts = await cartService.cartRender({_id : cid}, page);
        if (cartProducts) {
            let prevLink = cartProducts.hasPrevPage ? `http://localhost:${PORT}/carts?page=${cartProducts.prevPage}` : '';
            let nextLink = cartProducts.hasNextPage ? `http://localhost:${PORT}/carts?page=${cartProducts.nextPage}` : '';
            let isValid = !(cartProducts.page <= 0 || cartProducts.page > cartProducts.totalPages)
            res.render('carts', { cartProducts, prevLink, nextLink, isValid })
            }
        else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    }catch (error) {
        console.error('Error al buscar el carrito :', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
        
    }
    
}

