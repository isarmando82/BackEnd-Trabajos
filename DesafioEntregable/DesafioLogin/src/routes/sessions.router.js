import { Router } from 'express';
import userModel from '../services/db/models/user.model.js';

const router = Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password,} = req.body;
    console.log("Registrando user");
    console.log(req.body);

    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }

    const isAdmin = email.startsWith('admin');

    const user = {
        first_name,
        last_name,
        email,
        age,
        password,
        role:   isAdmin ? 'admin' : 'user'
    }
    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password })

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" })

    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
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


export default router;