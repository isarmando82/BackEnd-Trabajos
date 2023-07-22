import ProductManager from '../managers/ProductManager.js';

const productManager = new ProductManager('../Preentrega1 - Armando/data/products.json');

class ProductController {
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
    productManager.addProduct(product);
    res.status(201).json({ message: 'Producto agregado correctamente' });
  }

  updateProduct(req, res) {
    const productId = req.params.pid;
    const updatedFields = req.body;
    productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado correctamente' });
  }

  deleteProduct(req, res) {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente' });
  }
}

export default ProductController;
