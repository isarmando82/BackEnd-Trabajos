import { productManager } from "../services/factory.js";

const authMiddleWareController = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

const getProductController = async (req, res) => {
    const { page, query, sort  } = req.query;
        const productos = await productManager.getProductsPipeline( 12, page, query, sort );
        res.render('product', {productos: productos, user: req.session.user });
}

export { getProductController, authMiddleWareController }