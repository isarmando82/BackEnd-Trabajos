import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ProductManager } from './ProductManager.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const productManager = new ProductManager('products.json');

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.json());

// Todos los productos
app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit); // Parseamos el límite a un número entero
  const products = await productManager.getProducts();
  
  if (isNaN(limit) || limit <= 0) {
    // Si el límite no es un número válido o es menor o igual a cero, devolvemos todos los productos.
    res.json({ products });
  } else {
    const limitedProducts = products.slice(0, limit);
    res.json({ products: limitedProducts });
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

// Endpoint para mostrar la lista de productos en la vista "home"
app.get('/home', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Endpoint para mostrar la lista de productos en tiempo real en la vista "realTimeProducts"
app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// Endpoint para agregar un nuevo producto utilizando socket.io
app.post('/products', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  io.emit('updateProducts', productManager.getProducts());
  res.status(201).json(newProduct);
});

// Endpoint para eliminar un producto utilizando socket.io
app.delete('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  productManager.deleteProduct(productId);
  io.emit('updateProducts', productManager.getProducts());
  res.json({ message: 'Producto eliminado correctamente' });
});


// Inicializar la conexión de socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar eventos de creación de producto
  socket.on('newProduct', (product) => {
    productManager.addProduct(product);
    io.emit('updateProducts', productManager.getProducts());
  });

  // Escuchar eventos de eliminación de producto
  socket.on('deleteProduct', (productId) => {
    productManager.deleteProduct(productId);
    io.emit('updateProducts', productManager.getProducts());
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});


