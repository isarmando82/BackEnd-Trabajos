import CartManager from '../managers/CartManager.js';

const cartManager = new CartManager('../Preentrega1 - Armando/data/cart.json');

class CartController {
  createCart(req, res) {
    const newCart = cartManager.createCart();
    res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
  }

  getProductsByCartId(req, res) {
    const cartId = req.params.cid;
    const cart = cartManager.carts[cartId];

    if (cart) {
      res.json({ products: cart.products });
    } else {
      res.status(404).json({ message: 'Carrito no encontrado' });
    }
  }

  addProductToCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const cart = cartManager.carts[cartId];
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const product = productManager.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  }

  deleteProductFromCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = cartManager.carts[cartId];
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const product = productManager.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    cartManager.deleteProductFromCart(cartId, productId);
    res.json({ message: 'Producto eliminado del carrito correctamente' });
  }

  getAllCarts(req, res) {
    const allCarts = cartManager.getAllCarts();
    res.json({ carts: allCarts });
  }
}

export default CartController;





