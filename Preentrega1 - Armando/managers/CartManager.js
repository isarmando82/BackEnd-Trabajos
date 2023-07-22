import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = {};
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      this.carts = JSON.parse(data);
    } catch (err) {
      console.log('Error al cargar el archivo de carritos:', err.message);
    }
  }

  async saveCarts() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data, 'utf8');
      console.log('Carritos guardados correctamente.');
    } catch (err) {
      console.log('Error al guardar los carritos:', err.message);
    }
  }

  createCart() {
    const newCartId = Date.now().toString();
    const newCart = { id: newCartId, products: [] };
    this.carts[newCartId] = newCart;
    this.saveCarts();
    console.log('Carrito creado correctamente.');
    return newCart;
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.carts[cartId];
    if (!cart) {
      console.log('Error: Carrito no encontrado.');
      return;
    }

    const existingProduct = cart.products.find((p) => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCarts();
    console.log('Producto agregado al carrito.');
  }

  deleteProductFromCart(cartId, productId) {
    const cart = this.carts[cartId];
    if (!cart) {
      console.log('Error: Carrito no encontrado.');
      return;
    }

    const productIndex = cart.products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      this.saveCarts();
      console.log('Producto eliminado del carrito.');
    } else {
      console.log('Error: Producto no encontrado en el carrito.');
    }
  }


  getAllCarts() {
    return Object.values(this.carts);
  }
}



export default CartManager;




