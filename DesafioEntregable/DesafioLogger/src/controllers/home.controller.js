import { productManager } from "../services/factory.js";

const getHomeRenderController   = async (req, res) => {
        const productos = await productManager.getProducts();
        res.render('home', {productos: productos});
}

export { getHomeRenderController }