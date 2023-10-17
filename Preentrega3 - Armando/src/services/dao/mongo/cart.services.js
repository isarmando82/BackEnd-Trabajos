import { CartModel } from "./models/cartModel.js";
import { ProductModel } from "./models/productModel.js";


export default class CartServices {
    
  
    createCart = async (data)=> {
        let cart = CartModel.create(data);
        return cart;     
    };

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
        const cart = await CartModel.findOne(cid );
        const product = await ProductModel.findOne(pid); 
        
        if (cart && product) {
            const existingProduct = cart.products.find(p => p.product._id.toString() === product._id.toString());
            if (existingProduct) {
                cart.products.splice(cart.products.indexOf(existingProduct), 1);
            }
            await cart.save();
            return cart;
        } else {
            return null;
        }
};

    reduceProdQuantity = async (cid, pid)=> {
        const cart = await CartModel.findOne(cid );
        const product = await ProductModel.findOne(pid); 
        
        if (cart && product) {
            const existingProduct = cart.products.find(p => p.product._id.toString() === product._id.toString());
            if (existingProduct) {
                existingProduct.quantity > 1 ?
                existingProduct.quantity -=1 :
                cart.products.splice(cart.products.indexOf(existingProduct), 1);
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
            await cart.save();
            return cart;
        } else {
            return null;
        }
    };

    cartRender = async (cid, page) => {
        const cartProducts= await CartModel.paginate({_id : cid},{page, lean: true, populate: {path : 'products.product'}  })

        if (!cartProducts) {
            return res.status(404).send('Carrito no encontrado');
        }else {
            return cartProducts;
        }
    };

}
