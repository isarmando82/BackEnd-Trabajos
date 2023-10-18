import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productsCollection = 'products';

const stringRequired = {
    type: String,
    required: true
}
const numberRequired = {
    type: Number,
    required: true
}

const numberRequiredIndex = {
    type: Number,
    required: true,
    index: true
}

const productsSchema = new mongoose.Schema({
    title: stringRequired,
    description: stringRequired,
    price: numberRequired,
    code: stringRequired,
    thumbnails: String,
    code: stringRequired,
    stock: { type: Number },
    status: { type: Boolean },
    category: stringRequired
});
productsSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollection, productsSchema);