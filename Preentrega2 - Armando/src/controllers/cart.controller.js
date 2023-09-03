import { Mongoose } from "mongoose"
import Cartmanager from "../services/db/Cartmanager.js"
// import ProductManager from "../services/fs/Productmanager.js" 
import Productmanager from "../services/db/Productmanager.js"


class Cartcontroller{

    createCarts = async (req, res) => {
        try {
            let newCartPayload = await Cartmanager.createCart()
            res.status(201).send({status:"Nuevo carrito creado", payload: newCartPayload})
        } catch (error) {
            res.status(500).send({message:`Error al añadir producto a la base de datos: ${error}`})
        }
    }

    getCarts = async (req, res) => {
        try {
            let cartsListPayload = await Cartmanager.getCarts()
            res.status(200).send({status:"success", payload:cartsListPayload})
        } catch (error) {
            res.status(500).send({message:`Error al obtener lista de carrito: ${error}`})

        }
    }
    
    getCartsById = async (req, res) => {
        try {
            const {cid} = req.params
            let cartByIdResultPayload = await Cartmanager.getCartsById(cid)
            if(cartByIdResultPayload.products){
                res.status(200).send({result:"Success", payload:cartByIdResultPayload})
            }else{
                res.status(401).send({result:"error", payload:`No existe el carrito con el id ${cid}`})
            }
        } catch (error) {
            res.status(500).send({message: `Error al obtener id:${error}`})
        }
    }
    
    updateCart = async (req, res) => {
        try {
            const {cid} = req.params
            const productUpdatedPayload = req.body
            let updateResult = await Cartmanager.updateCart(cid, productUpdatedPayload)
            if(updateResult.acknowledged === true){
                res.status(200).send({result:"Success", payload:updateResult})
            }else{
                res.status(401).send({result:"error", payload:`No existe el carrito con el id ${cid}`})
            }
        } catch (error) {
            res.status(500).send({message: 'Id no encontrado'})   
        }
    }

    updateProductQuantity = async (req, res) => {
        try {
            const {cid, pid} = req.params
            const quantity = parseInt(req.body.quantity)
            let updateResultPayload = await Cartmanager.updateCartProductById(cid, pid, quantity)
            if(updateResultPayload.acknowledged === true){
                res.status(200).send({result:"Success", payload:updateResultPayload})
            }else{
                res.status(401).send({result:"error", payload:`No existe el carrito con el id ${cid}`})
            }
        } catch (error) {
            res.status(500).send({message: 'Id no encontrado'})   
        }
    }
    
    deleteAllCartProducts = async (req, res) => {
        try {
            const {cid} = req.params
            let deleteResultPayload = await Cartmanager.deleteProducts(cid)
            if(deleteResultPayload.acknowledged === true){
                res.status(200).send({result:"Success", payload:deleteResultPayload})
            }else{
                res.status(401).send({result:"error", payload:`No existe el carrito con el id ${cid}`})
            }
        } catch (error) {
            res.send({ message: 'Error al eliminar producto'})   
        }
        
    }

    viewCartProducts = async (req, res) => {
        try {
            const {cid} = req.params
            let cartByIdResult = await Cartmanager.getCartsById(cid)
            let cartProductsListJSON = JSON.parse(JSON.stringify(cartByIdResult))
            res.status(200).render('carts', {
                cartProductsListJSON,
                style:"index.css"
            })
        } catch (error) {
            res.status(500).send({message: `Error al obtener id:${error}`})
        }
       
    }
}

export default new Cartcontroller