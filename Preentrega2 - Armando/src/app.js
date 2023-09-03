import express from "express"
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import viewsRoutes from './routes/views.routes.js'
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { connectMongoDB } from "./db.js"

const app = express()
const PORT = 8080

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/products", productsRoutes)
app.use("/api/carts", cartsRoutes)
app.use("/", viewsRoutes)

app.listen(PORT, () =>{
    console.log(`server running at port ${PORT}`);
})

connectMongoDB()