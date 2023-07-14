import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const productManager = new ProductManager('products.json');


app.use(express.json());

// Todos los productos

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json({ products: limitedProducts });
  } else {
    res.json({ products });
  }
});

// Producto por ID

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});


app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});