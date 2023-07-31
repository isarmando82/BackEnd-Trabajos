import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import productRouter from './src/routes/productRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import __dirname from './src/utils.js';
import ProductManager from './src/managers/ProductManager.js';
import ProductController from './src/controllers/ProductController.js'; 

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');


app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productRouter);


app.use('/api/carts', cartRouter);


const productManager = new ProductManager('./src/data/products.json');

// Crea una instancia del controlador de productos pasándole el servidor de Socket.IO
const productController = new ProductController(io);

// Ruta para la vista "home.handlebars" que muestra la lista de productos
app.get('/home', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Ruta para la vista en tiempo real "realTimeProducts.handlebars"
app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
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

// Resto de tu código...

// Iniciar el servidor en el puerto 8080
server.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});







