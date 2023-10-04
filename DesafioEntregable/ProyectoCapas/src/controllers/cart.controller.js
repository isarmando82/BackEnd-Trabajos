import CartServices from "../services/cart.services.js";

const services = new CartServices();

export const creatNewCart = async (req, res)=>{
    try {
        const {body} = req;
    const result = await services.createCart(body);
    res.send({ status: "200", message: "Carrito creado con exito con ID: " + result.id })
    } catch (error) {
        res.status(400).json(error.message);
    }
};


export const searchCart = async (req, res)=>{
    const cid = req.params.cid;
    try {
        const cart = await services.getCartById({ _id : cid})

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
    const { body } = req;
    const pid = body.id;
    try {
        const cart = await services.prodInCart({_id:cid},{_id:pid})
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
        const cart = await services.deleteProdInCart({ _id: cid }, { _id: pid });
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
        const cart = await services.deleteAll({ _id: cid });     
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

