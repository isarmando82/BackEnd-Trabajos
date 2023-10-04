
import express from 'express';
import {__dirname} from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

//db
import MongoSingleton from './config/db.js';


//router
import productRoutes from './routes/Mongo/productRoutes.js'
import cartRoutes from './routes/Mongo/cartRoutes.js';
import usersViewRouter from './routes/Users/users.views.router.js';
import userRouter from './routes/Users/users.router.js'
import views from './routes/Mongo/view.routes.js';
import configEnv from './config/env.config.js';
import './config/db.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express();



app.use(cookieParser("CoderS3cr3tC0d3"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/public'));


initializePassport();
app.use(passport.initialize());


//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Session
app.use(session({
    mongoUrl: configEnv.mongoUrl,
    ttl: 60,
    secret: "coderS3cr3t",
    resave: true, 
    saveUninitialized: false, 
}));


app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes);  
app.use("/products", views);
app.use("/carts", views);
app.use("/users", usersViewRouter);
app.use("/api/users", userRouter);






const PORT = configEnv.port ;
const httpServer = app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});


const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log(error);
    }
};
mongoInstance();

app.get('/', async (req, res) => {
    let allProducts = await productManager.getProducts();
    const products = JSON.parse(allProducts);
    console.log(allProducts);
    res.render('home', {
        title: 'Express con Handlebars',
        products
    });
    }
)



export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    const data = await productManager.getProducts();
    console.log(data);
    const dataProd = JSON.parse(data);
    socket.emit('all-products', {dataProd});
    }) 
    






/* //Devuelve todos los productos
app.get('/productos', async (req, res) => {
    const productos = await productManager.getProducts();
    const prodObjeto = JSON.parse(productos); 
    res.json (prodObjeto);
}) 

//Devuelve la cantidad de productos segun el query limit
app.get('/productos/query', async (req, res) => {
    const {limit} = req.query;
    if (limit == undefined) {
        const productos = await productManager.getProducts();
        const prodObjeto = JSON.parse(productos); 
        res.json (prodObjeto);
    }else if(limit > 0){
        const productos = await productManager.getProducts();
        const prodObjeto = JSON.parse(productos); 
        const prodFiltrados = prodObjeto.slice(0, limit);
        res.json (prodFiltrados);
    }else {
        res.json ({error: 'El monto requerido supera la cantidad de productos'});   
    }
})

app.get('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    const producto = await productManager.getProductById(id);
    if (producto) {
        res.json ({producto});
    }else {
        res.json ({error: 'producto no encontrado'});
    }    
})

const producto = async () => {
    await productManager.getProductById(1)
}
console.log(producto()); */

