import mongoose from 'mongoose';

const ticketsCollection = 'tickets';

const numberRequired = {
    type: Number,
    required: true,
}
const numberRequiredIndex = {
    type: Number,
    required: true,
}

const ticketsSchema = new mongoose.Schema({
    code: String,
    amount: numberRequired,
    purchaser: String,
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
    notAvailableProducts: {
        type: [
            {
                notAvailableProduct: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: numberRequiredIndex
            }
        ],
        default: []
    }
}, {
    timestamps: true
});

export const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);