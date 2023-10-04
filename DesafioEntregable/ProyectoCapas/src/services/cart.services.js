import { CartModel } from "../models/cartModel.js";
import { ProductModel } from "../models/productModel.js";


export default class CartServices {
    
    //services create cart
    createCart = async (data)=> {
        let cart = CartModel.create(data);
        return cart;     
    };

    //services get cart by id
    getCartById = async (id)=> {
        const cart = await CartModel.findOne(id).populate('products.product');
        if (cart) {
            return cart; 
        } else {
            return null;
            }
    };

    prodInCart= async (cid, pid)=> {
        const cart = await CartModel.findOne(cid);
        const product = await ProductModel.findOne(pid); 
        if (cart && product) {
            const existingProduct = cart.products.find(p => p.product._id.toString() === product._id.toString());
            if (existingProduct) {
                existingProduct.quantity +=1;
            } else {
                cart.products.push({ "product": product._id, "quantity": 1});}
            await cart.save();
            return cart;
        } else {
            return null;
        }
    };

    deleteProdInCart = async (cid, pid)=> {
        console.log(cid, pid);
        const cart = await CartModel.findOne(cid );
        const product = await ProductModel.findOne(pid); 
        
        if (cart && product) {
            const existingProduct = cart.products.find(p => p.product._id.toString() === product._id.toString());
            if (existingProduct) {
                existingProduct.quantity > 1 ?
                existingProduct.quantity -=1 :
                cart.products.splice(p => p.product != pid)
            }
            
        
            await cart.save();
            return cart;
        } else {
            return null;
        }
};
    deleteAll = async (cid)=> {
        const cart = await CartModel.findOne(cid);     
        if (cart) {
            cart.products.splice (0, cart.products.length);
            
            // Guardamos los cambios en el carrito
            await cart.save();
            return cart;
        } else {
            return null;
        }
    };

}
