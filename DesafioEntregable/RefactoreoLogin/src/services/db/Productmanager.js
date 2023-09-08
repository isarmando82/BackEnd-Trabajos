import productModel from './models/product.js'

class Productmanager {
    addProducts = async (newProduct) =>{
        try {
            let newProductResult = await productModel.create(newProduct)
            return newProductResult
        } catch (error) {
            return error
        }
    }

    getProducts = async (limit, page, filter, sortOrder) =>{       
        try {
            if (sortOrder !== false){
                const sortOption = {"price": sortOrder}
                let productListResult = await productModel.paginate(filter,{limit:limit, page, sort:sortOption})
                
                return productListResult
            } else {
                let productListResult = await productModel.paginate(filter,{limit:limit, page, lean:true})
                return productListResult
            }
        } catch (error) {
            return error
        }
    }

    getProductsById = async (productId) =>{
        try {
            let productByIdResult = await productModel.findById({_id:productId}).lean()
            return productByIdResult
        } catch (error) {
            return error
        }
    }

    updateProducts = async(productId, productUpdated) =>{
        try {
            let updateProductResult = await productModel.updateOne({_id:productId}, productUpdated)
            return updateProductResult
        } catch (error) {
            console.log(`Error al escribir lista de archivos: ${error}`)
        }
    }

    deleteProducts = async(productId) =>{
        try {
            let updateProductResult = await productModel.deleteOne({_id:productId})
            return updateProductResult
        } catch (error) {
            console.log(`Error al escribir lista de archivos: ${error}`)
        }
    }
}

export default new Productmanager