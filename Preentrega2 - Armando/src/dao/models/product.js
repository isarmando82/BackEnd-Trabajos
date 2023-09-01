import { Schema, model } from 'mongoose'
import pkg from 'mongoose-paginate-v2';

const productCollection = 'products'
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})
ProductSchema.plugin(pkg)
const ProductModel = model(productCollection, ProductSchema)

export default ProductModel