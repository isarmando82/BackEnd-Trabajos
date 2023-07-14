const ProductManager = require("./ProductManager.js");

const testProductManager = async () => {
  const productManager = new ProductManager();

  // Agregar productos
  await productManager.addProduct({
    title: "Cafe",
    description: "Cafe tostado Juan Valdez",
    price: 2000,
    thumbnail: "http://cafe.png",
    code: "CA45CO",
    stock: 35,
  });

  await productManager.addProduct({
    title: "Té",
    description: "Té verde orgánico",
    price: 1500,
    thumbnail: "http://te.png",
    code: "TE78GR",
    stock: 20,
  });

  // Obtener todos los productos
  const products = await productManager.getProducts();
  console.log("Productos encontrados:");
  console.log(products);

  // Obtener un producto por ID
  const productById = await productManager.getProductById(1);
  console.log("Producto con ID 1:");
  console.log(productById);

  // Actualizar un producto
  await productManager.updateProduct(1, {
    price: 2500,
    stock: 25,
  });
  console.log("Producto actualizado.");

  // Obtener todos los productos actualizados
  const updatedProducts = await productManager.getProducts();
  console.log("Productos actualizados:");
  console.log(updatedProducts);

  // Eliminar un producto por ID
  await productManager.deleteProduct(2);
  console.log("Producto eliminado.");

  // Obtener todos los productos después de eliminar uno
  const remainingProducts = await productManager.getProducts();
  console.log("Productos restantes:");
  console.log(remainingProducts);
};

testProductManager();