import mongoose from 'mongoose';

const cartsCollection = 'carts';

const numberRequiredIndex = {
    type: Number,
    required: true,
    index: true
}

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: numberRequiredIndex
            }
        ],
        default: []
    },
    
});

export const cartModel = mongoose.model(cartsCollection, cartsSchema);