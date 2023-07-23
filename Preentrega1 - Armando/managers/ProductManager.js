import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextProductId = 1;
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.nextProductId = lastProduct.id + 1;
      }
      
      if (!Array.isArray(this.products)) {
        this.products = [];
      }
    } catch (err) {
      console.log('Error al cargar el archivo de productos:', err.message);
    }
  }

  async saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data, 'utf8');
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
    const parsedId = parseInt(id);
    if (Number.isNaN(parsedId)) {
      console.log('Error: ID de producto inválido.');
      return null;
    }

    const product = this.products.find((p) => p.id === parsedId);
    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado.');
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const parsedId = parseInt(id);
    if (Number.isNaN(parsedId)) {
      console.log('Error: ID de producto inválido.');
      return;
    }

    const index = this.products.findIndex((p) => p.id === parsedId);
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
    const parsedId = parseInt(id);
    if (Number.isNaN(parsedId)) {
      console.log('Error: ID de producto inválido.');
      return;
    }

    const index = this.products.findIndex((p) => p.id === parsedId);
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
      product.code &&
      product.status &&
      product.stock &&
      product.category
    );
  }

  isDuplicateCode(code) {
    return this.products.some((p) => p.code === code);
  }
}

export default ProductManager;
