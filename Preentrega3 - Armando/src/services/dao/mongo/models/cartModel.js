import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const colleccionName = 'carts';

const Schema = new mongoose.Schema({
    userId: String,
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
})

Schema.pre('findOne', function() {	
    this.populate('products.product');
})

Schema.plugin(mongoosePaginate)
export const  CartModel = mongoose.model( colleccionName, Schema);