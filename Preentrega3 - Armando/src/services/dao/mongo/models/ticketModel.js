import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const colleccionName = 'tickets';

const Schema = new mongoose.Schema({  
        amount:{
            type: Number,
            required: true
        },
        purchaser: {
            type: String,
            required: true
        },
        code: {
            type: Number,
            required: true,
            unique: true,
        },
        products:{
            type: Array,
            required: true 
        },
    }, 
{timestamps: true},
)

Schema.plugin(mongoosePaginate)
export const  TicketModel  = mongoose.model( colleccionName, Schema);