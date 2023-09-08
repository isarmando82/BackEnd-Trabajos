import express from "express"
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { connectMongoDB } from "./db.js"
import adminRoutes from '../src/routes/adminRoutes.js';
import cookieParser from "cookie-parser"

//Passport imports
import passport from 'passport';
import initializePassport from './config/passport.config.js';

// dependencias para las sessions
import session from 'express-session';
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'

//import Routers
import viewsRouter from './routes/views.router.js';
import usersViewRouter from './routes/users.views.router.js';
import sessionsRouter from './routes/sessions.router.js'
import githubLoginViewRouter from '../src/routes/github-login.views.router.js'

const app = express()
const PORT = 8080

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('CoderS3cr3tC0d3'));

const MONGO_URL = "mongodb://0.0.0.0:27017/desafiologin?retryWrites=true&w=majority";

app.use(session({
    //ttl: Time to live in seconds,
    //retries: Reintentos para que el servidor lea el archivo del storage.
    //path: Ruta a donde se buscará el archivo del session store.

    // Usando --> session-file-store
    // store: new fileStorage({ path: "./sessions", ttl: 15, retries: 0 }),


    // Usando --> connect-mongo
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        // mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10
    }),


    secret: "coderS3cr3t",
    resave: false, //guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
}));

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

app.use("/", viewsRouter);
app.use("/users", usersViewRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use('/admin', adminRoutes);
app.use("/github", githubLoginViewRouter);

app.listen(PORT, () =>{
    console.log(`server running at port ${PORT}`);
})

connectMongoDB()