import cartModel from "./models/cart.js"

class Cartmanager{
    createCart = async () =>{
        try {
            let newCartResult = await new cartModel
            await newCartResult.save()
            return newCartResult
        } catch (error) {
            return error
        }
    }

    getCarts = async () =>{
        try {
            let cartsListResult = await cartModel.find()
            return cartsListResult
        } catch (error) {
            return error
        }
    }

    getCartsById = async (cartId) =>{
        try {
            let productByIdResult = await cartModel.findById(cartId).populate('products.id').lean()
            return productByIdResult
        } catch (error) {
            return error
        }
    }

    updateCart = async(cartId, productUpdated) =>{
        try {
            let updateProductResult = await cartModel.updateOne({_id:cartId}, productUpdated)
            return updateProductResult
        } catch (error) {
            return error
        }
    }

    updateCartProductById = async(cartId, productUpdatedId, quantity) =>{
        try {
            let updateProductResult = await cartModel.updateOne({ "_id": cartId, "products.id": productUpdatedId},{ $set: { "products.$.quantity": quantity } })
            return updateProductResult
        } catch (error) {
            return error
        }
    }

    deleteProducts = async(cartId) =>{
        try {
            let updateProductResult = await cartModel.updateOne({_id:cartId}, {$set: {products: []}})
            console.log(updateProductResult)
            return updateProductResult
        } catch (error) {
            return error
        }
    }

    async addProductToCart(cartId, product, quantity) {
        try {
          // Obtén el carrito por su ID
          const cart = await cartModel.findById(cartId);
    
          if (!cart) {
            throw new Error(`No se encontró el carrito con el ID ${cartId}`);
          }
    
          // Verifica si el producto ya está en el carrito
          const existingProduct = cart.products.find(
            (p) => p.id.toString() === product._id.toString()
          );
    
          if (existingProduct) {
            // Si el producto ya existe en el carrito, actualiza su cantidad
            existingProduct.quantity += quantity;
          } else {
            // Si el producto no existe en el carrito, agrégalo a la lista de productos
            cart.products.push({ id: product._id, quantity });
          }
    
          // Guarda el carrito actualizado en la base de datos
          const updateResult = await cart.save();
    
          return {
            acknowledged: true,
            updatedCart: updateResult,
          };
        } catch (error) {
          console.error(error);
          return {
            acknowledged: false,
            error: error.message,
          };
        }
      }
    }

  


export default new Cartmanager