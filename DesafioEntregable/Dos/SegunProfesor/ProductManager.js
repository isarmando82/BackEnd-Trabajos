class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;

    constructor() {
        this.#products = new Array();
        this.#productDirPath = "./files";
        this.#productFilePath = this.#productDirPath + "/Products.json";
        this.#fileSystem = require("fs");
    }

    addProduct = async (product) => {
        if (!this.validateProductFields(product)) {
            console.log('Error: Todos los campos deben estar completos.');
            return;
        }

        if (this.isDuplicateCode(product.code)) {
            console.log('Error: El código ya existe para otro producto.');
            return;
        }

        product.id = this.getNextProductId();
        this.#products.push(product);
        await this.saveProducts();
        console.log('Producto agregado correctamente.');
    }

    getProducts = async () => {
        await this.loadProducts();
        return this.#products;
    }

    getProductById = async (id) => {
        await this.loadProducts();
        const product = this.#products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.log('Error: Producto no encontrado.');
            return null;
        }
    }

    updateProduct = async (id, updatedFields) => {
        await this.loadProducts();
        const index = this.#products.findIndex((p) => p.id === id);
        if (index !== -1) {
            const product = this.#products[index];
            Object.assign(product, updatedFields);
            await this.saveProducts();
            console.log('Producto actualizado correctamente.');
        } else {
            console.log('Error: Producto no encontrado.');
        }
    }

    deleteProduct = async (id) => {
        await this.loadProducts();
        const index = this.#products.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            await this.saveProducts();
            console.log('Producto eliminado correctamente.');
        } else {
            console.log('Error: Producto no encontrado.');
        }
    }

    validateProductFields = (product) => {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock
        );
    }

    isDuplicateCode = (code) => {
        return this.#products.some((p) => p.code === code);
    }

    getNextProductId = () => {
        if (this.#products.length === 0) {
            return 1;
        }
        const lastProduct = this.#products[this.#products.length - 1];
        return lastProduct.id + 1;
    }

    loadProducts = async () => {
        try {
            const data = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf8');
            this.#products = JSON.parse(data);
        } catch (err) {
            console.log('Error al cargar el archivo de productos:', err.message);
        }
    }

    saveProducts = async () => {
        try {
            const data = JSON.stringify(this.#products, null, 2);
            await this.#fileSystem.promises.writeFile(this.#productFilePath, data, 'utf8');
            console.log('Productos guardados correctamente.');
        } catch (err) {
            console.log('Error al guardar los productos:', err.message);
        }
    }
}

module.exports = ProductManager;
