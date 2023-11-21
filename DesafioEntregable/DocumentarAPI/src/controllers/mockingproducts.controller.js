import { generateProduct } from '../utils.js'

const getMockingProductsController = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let products = [];
    for (let i = 0; i <= 100; i++) {
        products.push(generateProduct());
    }
    res.send(products);
}

export { getMockingProductsController }