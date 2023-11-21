import __dirname from '../../../utils.js';
import fileSystem from 'fs';
import { ProductManager } from './productManager.fs.js';
export class CartManager {
    #cartsPath;

    constructor() {
        this.#cartsPath = __dirname + '/data/carts.json';
    }

    createCart = async () => {
        const carts = await this.getCarts();
        const lastId = carts.length > 0 ? carts[carts.length - 1]._id : 0;
        const cart = { _id: lastId + 1, products: [] };
        carts.push(cart);
        await this.saveCarts(carts);
        return '{"status": "ok", "message": "Cart created successfully", "createdCartId": "' + (lastId + 1) + '"}';
    }

    addProduct = async (idCarrito, idProducto, cantidad) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart._id == idCarrito);
        if (cart) {
            const productoYaExistente = cart.products.find(x => x.product == idProducto);
            if (productoYaExistente) {
                const indexProducto = cart.products.findIndex(obj => obj.product == idProducto);
                cart.products[indexProducto].quantity += parseInt(cantidad);
            } else {
                cart.products.push({ product: idProducto, quantity: cantidad });
            }
            await this.saveCarts(carts);
            return '{"status": "ok", "message": "Product added successfully"}';
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    getCartById = async (cartId) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart._id == cartId);
        if (cart) {
            let productos = [];
            const productManager = new ProductManager();
            //Para compatibilizar el Populate
            for (let i = 0; i < cart.products.length; i++) {
                const producto = cart.products[i];
                const datosProducto = await productManager.getProductById(producto.product);
                producto.title = datosProducto.title;
                producto.description = datosProducto.description;
                producto.price = datosProducto.price;
                producto.code = datosProducto.code;
                producto.stock = datosProducto.stock;
                producto.category = datosProducto.category;
                producto._id = datosProducto._id;
                productos.push({ product: producto, quantity: producto.quantity });
            }
            return { id: cart._id, products: productos }
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart._id == cartId);
        if (cart) {
            const productoYaExistente = cart.products.find(x => x.product == productId);
            if (productoYaExistente) {
                const indexProducto = cart.products.findIndex(obj => obj.product == productId);
                cart.products[indexProducto].quantity = parseInt(quantity);
            } else {
                return '{"status":"failed", "message":"Product does not exists in cart"}';
            }
            await this.saveCarts(carts);
            return '{"status":"ok"}';
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    updateCart = async (cartId, products) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart._id == cartId);
        if (cart) {
            cart.products = products;
            await this.saveCarts(carts);
            return '{"status":"ok"}';
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    deleteProductFromCart = async (cartId, productId) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart._id == cartId);
        if (cart) {
            const indexProducto = cart.products.findIndex(obj => obj.product == productId);
            if (indexProducto > -1) {
                cart.products.splice(indexProducto, 1);
                await this.saveCarts(carts);
                return '{"status":"ok"}';
            } else {
                return '{"status":"failed", "message":"Product does not exists in cart"}';
            }
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    emptyCart = async(cartId) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart._id == cartId);
        if (cart) {
            cart.products = [];
            await this.saveCarts(carts);
            return '{"status":"ok"}';
        } else {
            return '{"status":"failed", "message":"Cart does not exists"}';
        }
    }

    getCarts = async () => {
        if (!fileSystem.existsSync(this.#cartsPath)) {
            await fileSystem.promises.writeFile(this.#cartsPath, "[]");
        }

        const carts = await fileSystem.promises.readFile(this.#cartsPath, 'utf-8');
        return JSON.parse(carts);
    }

    saveCarts = async (carts) => {
        await fileSystem.promises.writeFile(this.#cartsPath, JSON.stringify(carts));
    }


}