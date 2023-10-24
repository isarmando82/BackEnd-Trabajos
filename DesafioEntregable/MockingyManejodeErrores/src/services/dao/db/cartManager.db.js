import { cartModel } from "../db/models/cart.model.js";
export class CartManager {
    constructor() {
        //Estado inicial, Array carts vacío y definición de la base de datos a utilizar (se deja filename por retrocompatibilidad con fs)
        this.carts = [];
    }

    createCart = async () => {
        try {
            const insert = await cartModel.create({ products: [] });
            return '{"status": "ok", "message": "Cart created successfully", "createdCartId": "' + insert._id + '"}';
        } catch (error) {
            return '{"status": "failed", "message": "Error when creating cart: ' + error + '"}';
        }
    }

    addProduct = async (idCarrito, idProducto, cantidad) => {
        if (!idProducto || !cantidad || isNaN(cantidad) || !idCarrito) {
            return '{"status":"failed", "message":"Validation error. Please review your inputs and try again"}';
        } else {
            let carritoEncontrado = false;
            try {
                carritoEncontrado = await cartModel.findOne({ _id: idCarrito });
            }
            catch (error) {
                console.log("ERROR: " + error);
            }
            if (carritoEncontrado) {
                const productoYaExistente = carritoEncontrado.products.find(x => x.product == idProducto);
                if (productoYaExistente) {
                    const indexProducto = carritoEncontrado.products.findIndex(obj => obj.product == idProducto);
                    carritoEncontrado.products[indexProducto].quantity += parseInt(cantidad);
                } else {
                    carritoEncontrado.products.push({ product: idProducto, quantity: cantidad });
                }
                await cartModel.updateOne({ _id: idCarrito }, carritoEncontrado);
                return '{"status": "ok", "message": "Product added successfully"}';
            } else {
                return '{"status":"failed", "message":"Cart does not exists"}';
            }
        }
    }

    getCartById = async (cartId) => {
        let carritoEncontrado = false;
        try {
            carritoEncontrado = await cartModel.findOne({ _id: cartId }).populate('products.product').lean();
        }
        catch (error) {
            console.log("ERROR: " + error);
        }

        if (carritoEncontrado) {
            return { id: carritoEncontrado._id, products: carritoEncontrado.products }
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        if (!cartId || !productId || !quantity || isNaN(quantity)) {
            return '{"status":"failed", "message":"Validation error. Please review your inputs and try again"}';
        } else {
            let carritoEncontrado = [];
            try {
                carritoEncontrado = await cartModel.findOne({ _id: cartId });
            }
            catch (error) {
                console.log("ERROR: " + error);
            }

            if (!carritoEncontrado) {
                return '{"status": "failed", "message": "Cart does not exists"}';
            } else {
                //Busco el producto y actualizo la cantidad
                const indexProducto = carritoEncontrado.products.findIndex(obj => obj.product == productId);
                if (indexProducto === -1) {
                    return '{"status": "failed", "message": "Product does not exists in cart"}';
                } else {
                    carritoEncontrado.products[indexProducto].quantity = quantity;
                    await cartModel.updateOne(carritoEncontrado);
                    return '{"status":"ok"}';
                }
            }
        }
    }

    updateCart = async (cartId, products) => {
        //valido el carrito y actualizo sus productos
        let carritoEncontrado = [];
        try {
            carritoEncontrado = await cartModel.findOne({ _id: cartId });
        }
        catch (error) {
            console.log("ERROR: " + error);
        }
        if (!carritoEncontrado) {
            return '{"status": "failed", "message": "Cart does not exists"}';
        }
        else {
            //actualizo el carrito con los productos enviados
            carritoEncontrado.products = products;
            await cartModel.updateOne({ _id: cartId }, carritoEncontrado);
            return '{"status":"ok"}';
        }
    }

    deleteProductFromCart = async (cid, pid) => {
        let carritoEncontrado = [];
        try {
            carritoEncontrado = await cartModel.findOne({ _id: cid });
        }
        catch (error) {
            console.log("ERROR: " + error);
        }
        if (carritoEncontrado.length === 0) {
            return '{"status": "failed", "message": "Cart does not exists"}';
        } else {
            //Busco el producto y lo quito del carrito
            const indexProducto = carritoEncontrado.products.findIndex(obj => obj.product == pid);
            if (indexProducto === -1) {
                return '{"status": "failed", "message": "Product does not exists in cart"}';
            } else {
                carritoEncontrado.products.splice(indexProducto, 1);
                await cartModel.updateOne({ _id: cid }, carritoEncontrado);
                return '{"status":"ok"}';
            }

        }
    }

    emptyCart = async (id) => {
        let carritoEncontrado = [];
        try {
            carritoEncontrado = await cartModel.find({ _id: id });
        }
        catch (error) {
            console.log("ERROR: " + error);
        }
        if (carritoEncontrado.length === 0) {
            return '{"status": "failed", "message": "Cart does not exists"}';
        } else {
            //Busco el carrito y lo vacío
            try {
                await cartModel.updateOne({ _id: id }, { products: [] });
            } catch (error) {
                console.log("ERROR: " + error);
            }
            return '{"status":"ok"}';
        }
    }
}