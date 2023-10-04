import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";

const router = Router();

let productManager = new ProductManager();


router.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    const prodObjeto = JSON.parse(productos); 
    res.send({status: 'Success', payload: prodObjeto});
}) 


router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    const producto = await productManager.getProductById(id);
    if (producto) {
        res.send({status: 'Success', payload: producto});
    }else {
        res.json ({error: 'producto no encontrado'});
    }
    
})

router.post('/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;
    const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category};
    await productManager.addProduct(nuevoProducto); 
    if (nuevoProducto) {
        res.send({status: 'Success', payload: nuevoProducto});
    }else {
        res.json ({error:`Error al crear el producto nuevo`});
    }
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    const producto = req.body;
    console.log(producto);
    await productManager.updateProduct(id, producto);
    if (producto) {
        res.send({status: 'Success', payload: producto});
    }else {
        res.json ({error:`Error al actualizar el producto`});
    }
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    await productManager.deleteProduct(id);
    res.send({status: 'Success', payload: 'Producto eliminado'});
})
export default router;