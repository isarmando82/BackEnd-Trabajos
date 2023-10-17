import { productService } from "../services/factory.js";

/* const services = new productService(); */

export const createProduct = async (req, res) => {
    const { body } = req;
    try {
        const response = await productService.createProduct(body);
        res.send({ status: 'Success', payload: response })
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getProducts = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const filter = req.query.filter === 'false' ? false : true;
    try {
        const response = await productService.getAllProducts(limit, page, sort, filter);
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getProdById = async (req, res) => {
    const pid = req.params.pid;
    try {
        const response = await productService.getById({ _id: pid });
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const updateProdById = async (req, res) => {
    const pid = req.params.pid;
    const { body } = req;
        console.log(body);
    try {
        const response = await productService.update({ _id: pid }, { ...body });
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const deleteProdById = async (req, res) => {
    const pid = req.params.pid;
    try {
        const response = await productService.delete({ _id: pid });
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};
