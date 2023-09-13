import { Router } from "express";
import { ensureAuthenticated } from "../authMiddleware.js"; 

const router = Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});

router.get("/logout", (req, res) => {
    res.render('login')
});

// Aplica el middleware de autorización a la ruta "/users"
router.get("/", ensureAuthenticated, (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
});

export default router;