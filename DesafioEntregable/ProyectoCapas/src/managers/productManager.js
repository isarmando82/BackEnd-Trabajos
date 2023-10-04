import fs from 'fs'; 


class Product{
    constructor (title, description, price, thumbnail, code, stock, category){
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = true;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category = category;
    }
};
export class ProductManager {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;

    constructor(){
        this.#products = new Array();
        this.#productDirPath = "./Data";
        this.#productFilePath = this.#productDirPath + "/Products.json";
        this.#fileSystem = fs; 
    }


    isCodeDuplicated (code){
        return this.#products.some(product => product.code === code);
    }

    generateId (){
        return this.#products.length + 1;
    }

    addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
        let newProduct = new Product(title, description, price, thumbnail, code, stock, status, category);
        try{
            //creamos el directorio si no existe
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});    
            //verificamos si el archivo existe
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, '[]');
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = JSON.parse(productsFile);
            if (this.isCodeDuplicated(newProduct.code)){
                return {error: 'El codigo del producto ya existe'};
            }
            let id = this.#products.length + 1;
            let prodParaAgregar = {...newProduct, id: id};
            this.#products.push(prodParaAgregar);
            

            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
            this.emit('change', this.#products);
        }
        catch (error){
            console.error(`Error al crear el producto nuevo: ${JSON.stringify(newProd)}, detalle del error: ${error}`);
            throw Error(`Error al crear el producto nuevo: ${JSON.stringify(newProd)}, detalle del error: ${error}`);
        }
    }

    getProducts = async () => {
        try{
            //creamos el directorio si no existe
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});
            
            //verificamos si el archivo existe
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, '[]');
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
            this.#products = productsFile;    
            return this.#products;
        }
        catch (error){
            console.error(`Error al obtener los productos: ${error}`);
            throw Error(`Error al obtener los productos: ${error}`);
        }
    }

    getProductById = async (id) => {
        try{
            //creamos el directorio si no existe
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});
            
            //verificamos si el archivo existe
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, '[]');
            }
    
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
    
            this.#products = JSON.parse(productsFile);
    
            let product = this.#products.find(product => product.id === id);
            if (product){
                console.log(`Producto encontrado:`);
                console.log(product);
                return product;
            }
            
        }
        catch (error){
            console.error(`Error al obtener el producto con id: ${id}, detalle del error: ${error}`);
        }
    }

    updateProduct = async (id, producto /* clave, valor */) => {
        try{
            //creamos el directorio si no existe
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});
            
            //verificamos si el archivo existe
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, '[]');
            }
    
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
    
            this.#products = JSON.parse(productsFile);
    
            let product = this.#products.find(product => product.id === id);
            
                Object.assign(product, producto);
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));

                
        } catch (error){
            console.error(`Error al actualizar el producto con id: ${id}, detalle del error: ${error}`);
        }
    }

    deleteProduct = async (id) => {
        try{
            //creamos el directorio si no existe
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});
            
            //verificamos si el archivo existe
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, '[]');
            }
    
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, 'utf-8');
    
            this.#products = JSON.parse(productsFile);
    
            let product = this.#products.find(product => product.id === id);
            
            if (product){
                this.#products = this.#products.filter(product => product.id !== id);
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
                console.log(`Producto eliminado:`);
                console.log(product);
                console.log(this.#products);
                
            }
        
        }catch (error){
            console.error(`Error al eliminar el producto con id: ${id}, detalle del error: ${error}`);
        }

    }

}






