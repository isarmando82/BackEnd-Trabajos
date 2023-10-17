//import dependencias
import express from 'express';
import {__dirname} from './utils.js';

/* import { Server } from 'socket.io'; */
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

//router
import productRoutes from './routes/Mongo/product.router.js'
import cartRoutes from './routes/Mongo/cart.router.js';
import usersViewRouter from './routes/Mongo/users.views.router.js';
import userRouter from './routes/Mongo/users.router.js'
import views from './routes/Mongo/view.router.js';
import ticketRouter from './routes/Mongo/ticket.router.js';

//managers
/* import dotenv from 'dotenv'; */
import configEnv from './config/env.config.js';
import './config/db.js'


import session from 'express-session';

import passport from 'passport';
import initializePassport from './config/passport.config.js';


const app = express();


app.use(cookieParser("CoderS3cr3tC0d3"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

initializePassport();
app.use(passport.initialize());


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use(session({
    mongoUrl: configEnv.mongoUrl,
    ttl: 60,
    secret: "coderS3cr3t",
    resave: true, 
    saveUninitialized: false, 
    
}));

//Routers use
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes);  
app.use("/products", views);
app.use("/carts", views);
app.use("/users", usersViewRouter);
app.use("/api/users", userRouter);
app.use("/api/ticket", ticketRouter);


const PORT = configEnv.port ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    });

