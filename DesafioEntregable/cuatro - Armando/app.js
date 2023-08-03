import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import viewRouter from './src/routes/viewRouter.js';
import __dirname from './src/utils.js';
import ProductManager from './src/managers/ProductManager.js';
import ProductController from './src/controllers/ProductController.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

const productManager = new ProductManager('./src/data/products.json');
const productController = new ProductController(io);

// Middleware de Socket.IO
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/home', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('newProduct', (product) => {
    productManager.addProduct(product);
    io.emit('updateProducts', productManager.getProducts());
  });

  socket.on('deleteProduct', (productId) => {
    productManager.deleteProduct(productId);
    io.emit('updateProducts', productManager.getProducts());
  });
});

app.use('/', viewRouter); 



server.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});








