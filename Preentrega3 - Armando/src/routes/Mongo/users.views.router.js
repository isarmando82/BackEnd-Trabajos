import { Router } from "express";
import passport from "passport";
import {logAuthenticate} from '../../controllers/user.controller.js'

const router = Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});


router.get("/", passport.authenticate('jwt', { session: true}), logAuthenticate);


export default router;