import mongoose from "mongoose";

const cartsCollection  = "carts"

const cartsSchema = new mongoose.Schema({
    products: [{
        id: {
            type: mongoose.Types.ObjectId,
            ref:"products",
            required: true},
        quantity: {
            type: Number, 
            required: true},
    }]
        
})

const cartsModel = new mongoose.model(cartsCollection, cartsSchema)

export default cartsModel