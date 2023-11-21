import __dirname from '../../../utils.js';
import fileSystem from 'fs';
export class ProductManager {
    #productsPath
    constructor() {
        this.#productsPath = __dirname + '/data/products.json';
    }

    getProducts = async () => {
        if (!fileSystem.existsSync(this.#productsPath)) {
            await fileSystem.promises.writeFile(this.#productsPath, "[]");
        }

        const products = await fileSystem.promises.readFile(this.#productsPath, 'utf-8');
        return products;
    }

    getProductsPipeline = async (limit = 10, page = 1, query = "", sort = "") => {
        //Esta función no se puede utilizar con el sistema de ficheros ya que Paginate es complemento de MongoDB
        const productos = await this.getProducts();
        return {
            status: "success",
            payload: JSON.parse(productos),
            totalPages: 1,
            prevPage: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevLink: "#",
            nextLink: "#",
            validPage: true
        }
    }

    getProductById = async (id) => {
        let products = await this.getProducts();
        products = JSON.parse(products);
        return products.find(product => product._id == id);
    }

    addProduct = async (producto) => {
        let products = await this.getProducts();
        products = JSON.parse(products);
        const lastId = products.length > 0 ? products[products.length - 1]._id : 0;
        producto._id = lastId + 1;
        products.push(producto);
        await this.saveProducts(products);
        return '{"status":"ok"}';
    }

    updateProduct = async (id, productsDetails) => {
        let products = await this.getProducts();
        products = JSON.parse(products);
        const index = products.findIndex(product => product._id === id);
        products[index] = { ...products[index], ...productsDetails };
        await this.saveProducts(products);
        return '{"status":"ok"}';
    }

    deleteProduct = async(id) => {
        let products = await this.getProducts();
        products = JSON.parse(products);
        const index = products.findIndex(product => product._id === id);
        products.splice(index, 1);
        await this.saveProducts(products);
        return '{"status":"ok"}';
    }


    saveProducts = async (products) => {
        await fileSystem.promises.writeFile(this.#productsPath, JSON.stringify(products));
    }

}