import { productModel } from "../db/models/product.model.js";
export class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = async () => {
        let productos = [];
        try {
            productos = await productModel.find().lean();
        } catch (error) {
            console.log("ERROR: " + error);
        }
        return productos;
    }

    getProductsPipeline = async (limit = 10, page = 1, query = "", sort = "") => {
        let productos = [];
        let status = "error";
        if (isNaN(limit)) {
            limit = 10;
        }
        if (isNaN(page)) {
            page = 1;
        }
        try {
            if (query !== "") {
                productos = await productModel.paginate({ category: query }, { page: page, lean: true });
            } else {
                productos = await productModel.paginate({}, { page: page, lean: true });
            }

        } catch (error) {
            console.log("ERROR: " + error);
        }
        const filtros = [];
        if (query !== "") {
            filtros.push({ $match: { category: query } });
        }
        if (sort !== "" && (sort === "1" || sort === "-1")) {
            filtros.push({ $sort: { price: parseInt(sort) } });
        }
        if (page > 0) {
            filtros.push({ $skip: (page - 1) * limit });
        }
        if (limit > 0) {
            filtros.push({ $limit: limit });
        }
        if (filtros.length > 0) {
            productos.docs = await productModel.aggregate(filtros);
        }
        if (productos.docs.length > 0) {
            status = "success";
        }
        let paginaValida = !(page <= 0 || page > productos.totalPages);
        if (productos.docs.length === 0) {
            paginaValida = false;
        }
        if (!paginaValida) {
            status = "error";
        }
        return {
            status: status,
            payload: productos.docs,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            page: page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.prevPage ? `http://localhost:8080/products?page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: productos.nextPage ? `http://localhost:8080/products?page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
            validPage: paginaValida 
        };
    }

   
    getProductById = async (id) => {
        let productoEncontrado = false;
        try {
            productoEncontrado = await productModel.findOne({ _id: id });
        }
        catch (error) {
            console.log("ERROR: " + error);
        }

        if (productoEncontrado.length === 0) {
            return false;
        } else {
            return productoEncontrado;
        }
    }

    addProduct = async (producto) => {
        let status = true;

        if (!producto.title || !producto.description || !producto.price || isNaN(producto.price) || !producto.code || !producto.stock || isNaN(producto.stock) || !producto.category) {
            return '{"status": "failed", "message": "Validation error. Please review your inputs and try again"}';
        }
        if (producto.status != undefined) {
            status = producto.status;
        }
   
        const productoYaExiste = await productModel.findOne({ code: producto.code });
        if (productoYaExiste) {
            return '{"status": "failed", "message": "Product code already used"}';
        } else {

            const title = producto.title;
            const description = producto.description;
            const price = producto.price;
            const thumbnails = producto.thumbnails;
            const code = producto.code;
            const stock = producto.stock;
            const category = producto.category;
            const product = {
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                status,
                category
            }

            try {
                await productModel.create({ title: product.title, description: product.description, price: product.price, thumbnails: product.thumbnails, code: product.code, stock: product.stock, status: product.status, category: product.category });
                this.products.push(product);
                return '{"status":"ok"}';
            } catch {
                return '{"status":"failed", "message":"' + error + '"}';
            }
        }
    }
    updateProduct = async (id, productDetails) => {
        let productoEncontrado = [];
        try {
            productoEncontrado = await productModel.find({ _id: id });
        }
        catch (error) {
            console.log("ERROR: " + error);
        }
        if (productoEncontrado.length === 0) {
            return '{"status": "failed", "message": "Product does not exists"}';
        } else {
      
            let title = productoEncontrado.title;
            let description = productoEncontrado.description;
            let price = productoEncontrado.price;
            let thumbnails = productoEncontrado.thumbnails;
            let code = productoEncontrado.code;
            let stock = productoEncontrado.stock;
            let status = productoEncontrado.status;
            let category = productoEncontrado.category;
   
            if (productDetails.title) {
                title = productDetails.title;
            }
            if (productDetails.description) {
                description = productDetails.description;
            }
            if (productDetails.price) {
                price = productDetails.price;
            }
            if (productDetails.thumbnails) {
                thumbnails = productDetails.thumbnails;
            }
            if (productDetails.code || !isNaN(productDetails.code)) {
                code = productDetails.code;
            }
            if (productDetails.stock || !isNaN(productDetails.stock)) {
                stock = productDetails.stock;
            }
            if (productDetails.status != undefined) {
                status = productDetails.status;
            }
            if (productDetails.category) {
                category = productDetails.category;
            }
            const product = {
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                status,
                category
            }

            const actualizar = this.products.findIndex(obj => obj._id === id);
            this.products[actualizar] = product;

            try {
                await productModel.updateOne({ _id: id }, { title: product.title, description: product.description, price: product.price, thumbnails: product.thumbnails, code: product.code, stock: product.stock, status: product.status })

            } catch (error) {
                console.log("ERROR: " + error);
            }
            return '{"status":"ok"}';
        }
    }

    deleteProduct = async (id) => {
        let productoEncontrado = [];
        try {
            productoEncontrado = await productModel.find({ _id: id });
        }
        catch (error) {
            console.log("ERROR: " + error);
        }
        if (productoEncontrado.length === 0) {
            return '{"status": "failed", "message": "Product does not exists"}';
        } else {

            const nuevosProductos = this.products.filter(x => x._id !== id);
            this.products = nuevosProductos;
            try {
                await productModel.deleteOne({ _id: id });
            } catch (error) {
                console.log("ERROR: " + error);
            }
            return '{"status":"ok"}';
        }
    }
}