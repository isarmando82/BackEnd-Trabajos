import ProductManager from '../dao/classes/MongoDB/ProductManager.js';
import CartManager from '../dao/classes/MongoDb/CartManager.js';
import { Router } from 'express'

const router = Router()
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', async (req, res)=>{
    const {limit, page, query, sort } = req.query
    let info = await productManager.getProducts(limit, page, query, sort)
    let products = info.docs
    products = products.map(item => item.toObject())
    res.render('products', {
        products
    })
    // res.send(info)
})

router.post('/', async (req, res)=> {
    const { id } = req.body
    console.log(req.body);
    if (id !== undefined) {
        await cartManager.addProduct('640a9116397d14b30e55aa18', id)
    }
})

export default router