import fs from 'fs'
import __dirname from "../../utils.js"
import readDb from "./Readdb.js"
import Product from './models/Product.js'

class ProductManager {
    #productList
    #productDirPath
    #productFilePath

    constructor(){
        this.#productList = new Array()
        this.#productDirPath = __dirname + '/Data'
        this.#productFilePath = this.#productDirPath + "/products.json"
    }


    addProduct = async (nuevoProducto) =>{
        try {
            const listProducts = await readDb(this.#productDirPath, this.#productFilePath)
            const {title, description, code, price, stock, category, thumbnails} = nuevoProducto
            let newProduct = new Product (title, description, code, price, stock, category, thumbnails)
            this.#productList = JSON.parse(listProducts)
            this.#productList.length < 1?
                newProduct.id = 1 
                : newProduct.id = this.#productList.length + 1
            this.#productList.push(newProduct)
            
            await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#productList, null, '\t'))
            return this.#productList
        } catch (error) {
            return error
        }
    }

    getProducts = async () =>{
        try {
            const productList = await readDb(this.#productDirPath, this.#productFilePath)
            this.#productList = JSON.parse(productList)
            return this.#productList
        } catch (error) {
            return error
        }
    }

    updateProduct = async(productId, productUpdated ) =>{
        try {
            const {title, description, code, price, category, thumbnails} = productUpdated
            const productList = await readDb(this.#productDirPath, this.#productFilePath)
            this.#productList = JSON.parse(productList)
            const productIndex = this.#productList.findIndex(prod => prod.id === Number(productId))

            if(productIndex !== -1){
                this.#productList[productIndex].title = title
                this.#productList[productIndex].description = description
                this.#productList[productIndex].code = code
                this.#productList[productIndex].price = price
                this.#productList[productIndex].category = category
                this.#productList[productIndex].thumbnails = thumbnails
                await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#productList))
                    
            }
            return 'Producto actualizado por FS'
        } catch (error) {
            return error
        }
    }

    deleteProduct = async (productId) =>{
        try {
            const productList = await readDb(this.#productDirPath, this.#productFilePath)
            this.#productList = JSON.parse(productList)
            const productIndex = this.#productList.findIndex(prod => prod.id === Number(productId))
            console.log(this.#productList[productIndex])
            this.#productList.splice(productIndex, 1)
            await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#productList))
            return 'producto borrado'
        } catch (error) {
            return error
        }
    }
}

export default ProductManager