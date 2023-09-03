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
}


export default new Cartmanager