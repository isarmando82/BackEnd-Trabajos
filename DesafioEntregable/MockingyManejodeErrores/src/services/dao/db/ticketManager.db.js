import { ticketModel } from './models/ticket.model.js';
import { CartManager } from './cartManager.db.js';
import { ProductManager } from './productManager.db.js';

export class TicketManager {
    
    cart;
    cartManager = new CartManager();
    productManager = new ProductManager();

    createTicket = async (cartId, user) => {
        this.cart = await this.cartManager.getCartById(cartId);
        if (this.cart && user.name && user.email) {
                //valido si los productos comprados tienen stock
                let products = this.cart.products;
                let total = 0;
                let productsWithNoStock = [];
                let productsWithStock = [];
                let productsPostPurchase = [];
                let productNo;
                let productYes;
                let productPostPurchase;
                for (let i = 0; i < products.length; i++) {
                    let product = await this.productManager.getProductById(products[i].product._id);
                    if (product.stock < products[i].quantity) {
                        //De este producto NO hay Stock
                        productNo = {
                            notAvailableProduct: product._id,
                            quantity: products[i].quantity
                        }
                        //Acá los guardo para compatibilizarlo con el carrito
                        productPostPurchase = {
                            product: product._id,
                            quantity: products[i].quantity
                        }
                        productsWithNoStock.push(productNo);
                        productsPostPurchase.push(productPostPurchase);
                    } else {
                        //De este producto SI hay Stock
                        productYes = {
                            product: product._id,
                            quantity: products[i].quantity
                        }
                        productsWithStock.push(productYes);
                        total += (product.price * products[i].quantity);
                        //actualizo el stock del producto
                        product.stock = product.stock - products[i].quantity;
                        await this.productManager.updateProduct(product._id, product);
                    }
                }
            let ticket = {
                code: "PURCHASE_" + new Date().getTime() + "_" + user.name,
                amount: total,
                purchaser: user.email,
                products: productsWithStock,
                notAvailableProducts: productsWithNoStock
            };
            const insert = await ticketModel.create(ticket);
            this.cartManager.updateCart(cartId, productsPostPurchase);
            return '{"status":"success", "message":"Ticket created", "ticketId":"' + insert._id + '"}';
        } else {
            return '{"status":"failed", "message":"Cart not found"}';
        }
    }

    loadTicket = async (ticketId) => {
        try {
            const ticket = await ticketModel.findOne( {_id: ticketId }).populate('products.product').populate('notAvailableProducts.notAvailableProduct').lean();
            return ticket;
        } catch (error) {
            console.log("ERROR: " + error);
        }
    }
}
