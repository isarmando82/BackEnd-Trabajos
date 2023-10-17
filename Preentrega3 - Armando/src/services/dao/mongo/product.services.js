import { ProductModel } from "./models/productModel.js";


export default class ProductService {

    createProduct = async (product) => {
        const response = await ProductModel.create(product);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    getAllProducts = async (limit, page, sort, filter) => {
        const availableFilter = filter ? {} : { available: filter };
        const options = { sort: { price: sort }, limit, page };
        const response = await ProductModel.paginate(availableFilter, options);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    getById = async (id) => {
        const response = await ProductModel.findOne(id);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    update = async (id, product) => {
        console.log("el prod en service: " );
        console.log(product);
        const response = await ProductModel.updateOne(id, product);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    delete = async (id) => {
        const response = await ProductModel.deleteOne(id);
        if (response) {
            return response;
        } else {
            return null;
        }
    };
}