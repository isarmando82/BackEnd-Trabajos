import { Router } from 'express'
import CartManager from '../dao/classes/MongoDB/CartManager.js';

const router = Router()

const cartManager = new CartManager();

router.get('/:cid', async (req, res)=>{
    const { cid } = req.params
    let info = await cartManager.getCart(cid)
    let products = info.products
    products = products.map(item => item.toObject())
    let cart = {
        _id: info._id,
        products
    }
    // cart =  cart.map(item => item.toObject())
    res.render('carts', {
        cart
    })
    // res.send(info)
})

export default router