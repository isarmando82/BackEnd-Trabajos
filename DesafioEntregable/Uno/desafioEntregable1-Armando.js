// Se realiza el desafio entregable siguiendo las consignas establecidas
// en las PPT y en el .DOC de Testing entregable.
// Se utiliza para su realizacion el material (practicas) en clase y material
// extraido de la web.
// Ismael Armando.


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
        console.log('Error: El codigo ya existe para otro producto.');
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
        console.log('Error: Product not found.');
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
  
  // Listado de todos los productos
  console.log(productManager.getProducts());
  
  // Producto por ID
  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(7)); 