import fs from 'fs';
import { __dirname } from '../../../utils.js';
import Product from './models/productModel.js';


export default class ProductServices {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;

    constructor() {
        this.#products = new Array();
        this.#productDirPath = __dirname + "/Data";
        this.#productFilePath = this.#productDirPath + "/Products.json";
        this.#fileSystem = fs;
    }


    isCodeDuplicated(code) {
        return this.#products.some(product => product.code === code);
    }

    generateId() {
        return (new Date()).getTime();
    }

    #preparararDirectorioBase = async () => {
        await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });
            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, '[]');
            }
    }

    createProduct = async (body) => {

        let newProduct = new Product(body.title, body.description, body.price, body.status, body.thumbnail,  body.code, body.stock, body.available );
        console.log(newProduct);

        
        try {
            await this.#preparararDirectorioBase()
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = JSON.parse(productsFile);
            if (this.isCodeDuplicated(newProduct.code)) {
                return { error: 'El codigo del producto ya existe' };
            }
            let response = { ...newProduct, id: this.generateId() };
            this.#products.push(response);
            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
            return response;
        }
        catch (error) {
            console.error(`Error al crear el producto nuevo: ${JSON.stringify(newProd)}, detalle del error: ${error}`);
            throw Error(`Error al crear el producto nuevo: ${JSON.stringify(newProd)}, detalle del error: ${error}`);
        }
    }

    getAllProducts = async () => {
        try {
            await this.#preparararDirectorioBase()
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = JSON.parse(productsFile, null, 2);
            return  this.#products;
        }
        catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
            throw Error(`Error al obtener los productos: ${error}`);
        }
    }

    getById = async (data) => {
        let pid = parseInt(data._id)
        console.log(pid);
        try {
            await this.#preparararDirectorioBase()
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = JSON.parse(productsFile);
            let response = this.#products.find(product => product.id === pid);
            if (response) {
                console.log(response);
                return response;
            }

        }
        catch (error) {
            console.error(`Error al obtener el producto con id: ${id}, detalle del error: ${error}`);
        }
    }

    update = async (data, producto) => {
        let id = parseInt(data._id);
        console.log(producto);
        try {
            await this.#preparararDirectorioBase()
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = JSON.parse(productsFile);
            let product = this.#products.find(product => product.id === id);

            Object.assign(product, producto);
            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
            return product;

        } catch (error) {
            console.error(`Error al actualizar el producto id: ${id}, detalle del error: ${error}`);
        }
    }

    delete = async (data) => {
        let id = parseInt(data._id);
        try {
            await this.#preparararDirectorioBase()
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = JSON.parse(productsFile);
            let product = this.#products.find(product => product.id === id);
            if (product) {
                this.#products = this.#products.filter(product => product.id !== id);
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
                console.log(`Producto eliminado:`);
                console.log(product);
                console.log(this.#products);

            }

        } catch (error) {
            console.error(`Error al eliminar el producto id: ${id}, detalle del error: ${error}`);
        }

    }

}






