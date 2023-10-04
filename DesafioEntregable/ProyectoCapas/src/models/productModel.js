import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const colleccionName = 'products';



const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    code: {
        type:String,
        required: true,
        unique: true,
    },
    stock: {
        type:Number,
        required: true,
    },
    available: {
        type:Boolean,
        required: true,
    }
},
{timestamps: true},
)

Schema.plugin(mongoosePaginate)
export const ProductModel = mongoose.model(colleccionName, Schema);

