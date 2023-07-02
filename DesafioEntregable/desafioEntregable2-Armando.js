class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(product) {
    if (!this.validateProductFields(product)) {
      console.log('Error: Todos los campos deben estar completos.');
      return;
    }

    if (this.isDuplicateCode(product.code)) {
      console.log('Error: El código ya existe para otro producto.');
      return;
    }

    product.id = this.nextProductId++;
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      const product = this.products[index];
      Object.assign(product, updatedFields);
      console.log('Producto actualizado correctamente.');
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      console.log('Producto eliminado correctamente.');
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }

  validateProductFields(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
  }

  isDuplicateCode(code) {
    return this.products.some((p) => p.code === code);
  }
}

const productManager = new ProductManager();

// Agregar un nuevo producto.
productManager.addProduct({
  title: 'Producto 3',
  description: 'Descripción del producto 3',
  price: 199.99,
  thumbnail: 'ruta/imagenProducto3.jpg',
  code: 'ABC125',
  stock: 5
});

// Listado de todos los productos
console.log(productManager.getProducts());

// Producto por ID
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(7));

// Actualizar un producto
productManager.updateProduct(1, { price: 1099.99, stock: 15 });

// Eliminar un producto
productManager.deleteProduct(2);