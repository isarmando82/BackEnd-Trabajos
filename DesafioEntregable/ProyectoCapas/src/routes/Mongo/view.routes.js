import express from 'express';
import { ProductModel } from '../../models/productModel.js';
import { CartModel } from '../../models/cartModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
        let page = parseInt(req.query.page);
        if (!page) page = 1;
        let resultProd = await ProductModel.paginate({}, {page, lean: true })
        let prevLink = resultProd.hasPrevPage ? `http://localhost:8080/products?page=${resultProd.prevPage}` : '';
        let nextLink = resultProd.hasNextPage ? `http://localhost:8080/products?page=${resultProd.nextPage}` : '';
        let isValid = !(resultProd.page <= 0 || resultProd.page > resultProd.totalPages)
        res.render('products', { resultProd, prevLink, nextLink, isValid })
});

router.get('/:cid', async (req, res) => {
        let cid = req.params.cid;
        let page = parseInt(req.query.page);
        if (!page) page = 1;

        const cartProducts= await CartModel.paginate({_id : cid},{page, lean: true, populate: {path : 'products.product'}  })

        if (!cartProducts) {
                return res.status(404).send('Carrito no encontrado');
        }

        let prevLink = cartProducts.hasPrevPage ? `http://localhost:8080/carts?page=${cartProducts.prevPage}` : '';
        let nextLink = cartProducts.hasNextPage ? `http://localhost:8080/carts?page=${cartProducts.nextPage}` : '';
        let isValid = !(cartProducts.page <= 0 || cartProducts.page > cartProducts.totalPages)
        res.render('carts', { cartProducts, prevLink, nextLink, isValid })
});

export default router;