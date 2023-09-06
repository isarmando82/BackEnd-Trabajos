// import Productmanager from "../services/fs/Productmanager.js"
import Productmanager from "../services/db/Productmanager.js"



class Productcontroller{

    getProducts = async (req, res) => {
        try {
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const {category, status} = req.query
            const sortOrder = req.query.sort === "asc" || req.query.sort === "desc"? req.query.sort : false
            const filter = {}
            
            //consulta 
            if(category){
                filter.category = { $regex: `\\b${category}\\b`, $options: 'i' }
            }
    
            if(status){
                filter.status = status
            }
           
            let listaProductos = await Productmanager.getProducts(limit,page,filter,sortOrder)
            
            res.status(200).send({status:"success", payload:listaProductos})
        } catch (error) {
            res.status(500).send({message:`Error en lista de archivos de la base de datos: ${error}`})

        }
    }
    
    getProductsById = async (req, res) => {
        try {
            const {pid} = req.params
            let productById = await Productmanager.getProductsById(pid)
            res.status(200).send({result:"Success", payload:productById})
        } catch (error) {
            res.status(500).send({message: `Error al obtener id:${error}`})
        }
       
    }

    viewProducts = async (req, res) => {
        try {
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const {category, status} = req.query
            const sortOrder = req.query.sort === "asc" || req.query.sort === "desc"? req.query.sort : false
            const filter = {}
    
            if(category){
                filter.category = { $regex: `\\b${category}\\b`, $options: 'i' }
            }
    
            if(status){
                filter.status = status
            }


            let productList = await Productmanager.getProducts(limit,page,filter,sortOrder)

            
            if(productList.docs.length === 0){
                res.status(400).render('error', {error:"Error en los parametros de busqueda"})
            }else{
            
                let parsedUrl = req.originalUrl
                

                let isQueryEmpty = JSON.stringify(req.query) === '{}'
                
                if(isQueryEmpty){
                    parsedUrl += '?'
                }
                
                const parsedUrlParams = new URLSearchParams(parsedUrl)

    
                if(productList.hasNextPage === true){
                    if(parsedUrlParams.has('page')){
                        parsedUrlParams.set('page', productList.page +1)
                        const urlToString = parsedUrlParams.toString()
                        const decodedUrl = decodeURIComponent(urlToString)
                        
                        productList.nextLink = decodedUrl
                    }
                    else{
                        parsedUrlParams.append('page', productList.page +1)
                        const urlToString = parsedUrlParams.toString()
                        const decodedUrl = decodeURIComponent(urlToString)
                        productList.nextLink = decodedUrl
                    }
                }else{
                    productList.nextLink = null
                }

                if(productList.hasPrevPage){
                    if(parsedUrlParams.has('page')){
                        parsedUrlParams.set('page', productList.page -1)
                        parsedUrlParams.toString()
                        const decodedUrl = decodeURIComponent(parsedUrlParams)
                        productList.prevLink = decodedUrl
                    }else{
                        parsedUrlParams.append('page', productList.page -1)
                        parsedUrlParams.toString()
                        const decodedUrl = decodeURIComponent(parsedUrlParams)
                        productList.prevLink = decodedUrl
                    }
                }else{
                    productList.prevLink = null
                }
                
                let productListJSON = JSON.parse(JSON.stringify(productList))

                res.status(200).render('products', {
                        productListJSON,
                        style:"index.css"
                })
             }
        } catch (error) {
            res.status(500).render('error',{error})

        }
    }

    viewProductsById = async (req, res) => {
        try {
            const {pid} = req.params
            const productById = await Productmanager.getProductsById(pid)
            if(productById._id){
                res.status(200).render('productdetails', {
                    productById,
                    style:"index.css"
                })
            }else{
                res.status(400).render('error', {error:`No existe producto con id ${pid}`})
            }
            
        } catch (error) {
            res.status(500).send({message: `Error al obtener id:${error}`})
        }
    }
    
    addProducts = async (req, res) => {
        try {
            const {title, description, code, price, category, thumbnails} = req.body
            const nuevoProducto = {
                title,
                description,
                code,
                price,
                category,
                thumbnails,
            }
            let nuevoProductoPayload = await Productmanager.addProducts(nuevoProducto)
            res.status(201).send({status:"Producto agregado", payload: nuevoProductoPayload})
        } catch (error) {
            res.status(500).send({message:`Error al añadir producto a la db: ${error}`})
        }
    }

    updateProducts = async (req, res) => {
        try {
            const {pid} = req.params
            const productUpdated = req.body

            let updateResult = await Productmanager.updateProducts(pid, productUpdated)
            
            if(!!updateResult){
                res.status(201).send({result:"Success", payload:updateResult})
            }else{
                res.status(400).render('error', {error:`No existe producto con dicho id ${pid}`})
            }            
        } catch (error) {
            res.status(500).send({message: 'Id no encontrado'})   
        }
    }
    
    deleteProducts = async (req, res) => {
        try {
            const {pid} = req.params
            let deleteResultPayload = await Productmanager.deleteProducts(pid)
            res.send({result:'Success', payload:deleteResult})
            if(deleteResult.acknowledged === true){
                res.status(200).send({result:"Success", payload:deleteResultPayload})
            }else{
                res.status(401).send({result:"error", payload:`No existe el carrito con el id ${cid}`})
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar producto'})   
        }
        
    }
}

export default new Productcontroller