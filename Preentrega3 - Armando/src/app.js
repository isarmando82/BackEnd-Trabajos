import express from 'express';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import homeRoutes from './routes/home.routes.js';
import chatRoutes from './routes/chat.routes.js'
import cartsRoutes from './routes/carts.routes.js';
import productRoutes from './routes/product.routes.js';
import realTimeProducts from './routes/realtimeproducts.routes.js';
import userRoutes from './routes/users.views.routes.js';
import sessionRoutes from './routes/sessions.routes.js';
import logoutRoutes from './routes/logout.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import currentRoutes from './routes/current.routes.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { productManager, messageManager } from './services/factory.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import config from './config/enviroment.config.js';

console.log("Persistencia: " + config.persistence);

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoUrl, mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, ttl: 10 * 60 }),
    secret: 'pss4secretEAV',
    resave: false,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/home", homeRoutes);
app.use("/realtimeproducts", realTimeProducts);
app.use("/messages", chatRoutes)
app.use("/carts", cartsRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/logout", logoutRoutes);
app.use("/ticket", ticketRoutes);
app.use("/current", currentRoutes);
const httpServer = app.listen(config.port, () => {
    console.log(`Server levantado en el puerto ${config.port}`)
});

const socketServer = new Server(httpServer);


socketServer.on('connection', async socket => {
    const productos = await productManager.getProducts();
    socket.emit('products', productos);
    socket.on('updateRequest', async () => {
        const productos = await productManager.getProducts();
        socket.emit('products', productos);
    });
    const messages = await messageManager.getMessages();
    socket.emit('messages', messages);
    socket.on('new-message', async () => {
        const messages = await messageManager.getMessages();
        socket.emit('messages', messages);
    });
});