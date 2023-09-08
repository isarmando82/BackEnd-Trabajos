import { Router } from 'express';
import userModel from '../services/db/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ status: "success", message: "Usuario creado con exito." })

});



router.post("/login", passport.authenticate("login", { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);

    if (!user) return res.status(401).send({ status: "error", error: "credenciales incorrectas" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.status(400).json({error: "error logout", mensaje: "Error al cerrar la sesion"});
        }
        res.status(200).json({message: "Sesion cerrada correctamente."});
    });
});

router.get("/current", (req, res) => {
    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(401).json({ error: 'No hay sesión activa' });
    }
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});




export default router;