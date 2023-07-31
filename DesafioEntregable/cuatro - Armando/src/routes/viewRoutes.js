import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const viewRouter = express.Router();

// Cargar el administrador de productos
const productManager = new ProductManager('./src/data/products.json');

// Ruta para la vista "home.handlebars" que muestra la lista de productos
viewRouter.get('/home', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Ruta para la vista en tiempo real "realTimeProducts.handlebars"
viewRouter.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

export default viewRouter;