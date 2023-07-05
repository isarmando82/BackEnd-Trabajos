const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextProductId = 1;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.nextProductId = lastProduct.id + 1;
      }
    } catch (err) {
      console.log('Error al cargar el archivo de productos:', err.message);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf8');
      console.log('Productos guardados correctamente.');
    } catch (err) {
      console.log('Error al guardar los productos:', err.message);
    }
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
    this.saveProducts();
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
      this.saveProducts();
      console.log('Producto actualizado correctamente.');
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
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

const productManager = new ProductManager('products.json');

// Agregar un nuevo producto.

productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 999.99,
    thumbnail: 'ruta/imagenProducto1.jpg',
    code: 'ABC123',
    stock: 10
});

productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 100.50,
    thumbnail: 'ruta/imagenProducto2.jpg',
    code: 'ABC124',
    stock: 7
});

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
productManager.deleteProduct(3);