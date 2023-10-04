import { Router } from "express";
import {ProductModel} from "../../models/productModel.js";
import passport from "passport";





const router = Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});




router.get("/", passport.authenticate('jwt', { session: true}), async (req, res) => {
    let page = parseInt(req.query.page);
   
        if (!page) page = 1;
        let result = await ProductModel.paginate({}, {page, lean: true })
        let prevLink = result.hasPrevPage ? `http://localhost:8080/users?page=${result.prevPage}` : '';
        let nextLink = result.hasNextPage ? `http://localhost:8080/users?page=${result.nextPage}` : '';
        let isValid = !(result.page <= 0 || result.page > result.totalPages)

        res.render('profile', {user: req.user ,  result, prevLink, nextLink, isValid })
});

export default router;