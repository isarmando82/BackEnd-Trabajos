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
        products: {
            type: [
                {
                    product:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products"
                    },
                    quantity: {
                        type: Number,
                        default: 1
                    },
                }
            ],
            default:[]
        }  
    }, 
{timestamps: true},
)
Schema.pre('findOne', function() {	
    this.populate('products.product');
})

Schema.plugin(mongoosePaginate)
export const  TicketModel  = mongoose.model( colleccionName, Schema);