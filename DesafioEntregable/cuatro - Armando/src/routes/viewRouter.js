import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const viewRouter = express.Router();


const productManager = new ProductManager('./src/data/products.json');


viewRouter.get('/home', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});


viewRouter.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

export default viewRouter;