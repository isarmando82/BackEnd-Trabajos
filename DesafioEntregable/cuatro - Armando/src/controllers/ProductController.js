// productController.js
import ProductManager from '../managers/ProductManager.js';

const productManager = new ProductManager('../cuatro - Armando/src/data/products.json');

class ProductController {
  // Agregar un constructor para recibir la instancia del servidor de Socket.IO
  constructor(io) {
    this.io = io;
  }

  getAllProducts(req, res) {
    const limit = req.query.limit;
    const products = productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  }

  getProductById(req, res) {
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  }

  addProduct(req, res) {
    const product = req.body;

    if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
      res.status(400).json({ message: 'Todos los campos obligatorios del producto deben estar completos.' });
    } else {
      product.thumbnails = product.thumbnails || []; 
      product.status = product.status === undefined ? true : product.status; 
      productManager.addProduct(product);

      // Emitir evento newProduct al agregar un producto a través del servidor de Socket.IO
      this.io.emit('newProduct', productManager.getProducts());

      res.status(201).json({ message: 'Producto agregado correctamente' });
    }
  }

  updateProduct(req, res) {
    const productId = req.params.pid;
    const updatedFields = req.body;
    const providedFields = Object.keys(updatedFields);

    if (providedFields.length === 0) {
      res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar el producto.' });
    } else {
      productManager.updateProduct(productId, updatedFields);
      res.json({ message: 'Producto actualizado correctamente' });
    }
  }

  deleteProduct(req, res) {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);

    // Emitir evento deleteProduct al eliminar un producto a través del servidor de Socket.IO
    this.io.emit('deleteProduct', productManager.getProducts());

    res.json({ message: 'Producto eliminado correctamente' });
  }
}

export default ProductController;

