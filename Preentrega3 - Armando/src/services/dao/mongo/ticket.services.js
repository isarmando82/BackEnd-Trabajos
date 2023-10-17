import { CartModel } from "./models/cartModel.js";
import userModel  from "./models/userModel.js";
import { ProductModel } from "./models/productModel.js";
import { TicketModel } from "./models/ticketModel.js";
import CartServices from "./cart.services.js";


const cartServices = new CartServices();


function generateCode () {
    return (new Date()).getTime();
};

async function getUser (userId) {
    let userData = await userModel.findOne({_id: userId});
    return userData;
}

async function getCartById (cartId) {
    let cartData = await CartModel.findOne({_id: cartId});
    return cartData;
}
async function sumarPrecio(arrayDeObjetos) {
    const total = arrayDeObjetos.reduce((acumulador, objeto) => {
        if (objeto.product && objeto.product.price) {
            const precioPorCantidad = objeto.product.price * objeto.quantity;
            return acumulador + precioPorCantidad;
        }
        return acumulador;
    }, 0);
    return total;
}

export default class TicketServices {

    create = async (data) => {

        const cart = await getCartById(data)

        const user = await getUser( cart.userId); 

        const code = generateCode();

        const productsWithStock = [];

        for (let i = 0; i < cart.products.length; i++) {
            try {
                if (cart.products[i].product.stock < cart.products[i].quantity) {
                    console.log(`No hay stock suficiente para el producto id: ${cart.products[i].product._id}. Nota: El producto continua en el carrito hasta que haya stock disponible`);
                } else {
                    productsWithStock.push(cart.products[i]);
                    await ProductModel.updateOne(
                        { _id: cart.products[i].product._id },
                        { $inc: { stock: -cart.products[i].quantity } }
                    );
                    await cartServices.deleteProdInCart(cart._id, cart.products[i].product._id);
                }
            } catch (error) {
                
                console.error('Error en el ciclo: ' + error.message);
            }
        }

        if (productsWithStock.length === 0) { 
            return null;
        }

        const amount = await sumarPrecio(productsWithStock);

        const ticketData = {
            code : code,
            purchaser : user.email,
            amount : amount,
            products: productsWithStock
        };
        
        const ticket = await TicketModel.create(ticketData);
        return ticket;
    };

    getTicket = async (id) => {
        const ticket = await TicketModel.paginate({_id : id},{lean: true, populate: {path : 'products.product'}  });
        if (ticket) {
            return ticket;
        }else{
            return null;
        }
    }
}

    
        