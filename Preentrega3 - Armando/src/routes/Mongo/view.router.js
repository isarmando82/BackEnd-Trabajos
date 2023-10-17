import express from 'express';
import { ProductModel } from '../../services/dao/mongo/models/productModel.js'
import { CartModel } from '../../services/dao/mongo/models/cartModel.js';
import envConfig from '../../config/env.config.js';

const router = express.Router();
const PORT = envConfig.port;

router.get('/', async (req, res) => {
        let page = parseInt(req.query.page);
        if (!page) page = 1;
        let resultProd = await ProductModel.paginate({}, {page, lean: true })
        let prevLink = resultProd.hasPrevPage ? `http://localhost:${PORT}/products?page=${resultProd.prevPage}` : '';
        let nextLink = resultProd.hasNextPage ? `http://localhost:${PORT}/products?page=${resultProd.nextPage}` : '';
        let isValid = !(resultProd.page <= 0 || resultProd.page > resultProd.totalPages)
        res.render('products', { resultProd, prevLink, nextLink, isValid })
});


export default router;