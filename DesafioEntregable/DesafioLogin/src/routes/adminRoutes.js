import { Router } from 'express';
import userModel from '../services/db/models/user.model.js';

const router = Router();

// Middleware de autorización para usuarios administradores
function adminAuth(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next(); // El usuario es administrador, permite el acceso
    } else {
        res.status(403).send("Acceso no autorizado para usuarios no administradores");
    }
}

// Ruta específica para el administrador
router.get("/dashboard", adminAuth, (req, res) => {
    // Verificar si el usuario es administrador
    if (req.session.user && req.session.user.role === 'admin') {
        // Lógica específica del panel de administrador
        res.send("¡Bienvenido al panel de administrador!");
    } else {
        res.status(403).send("Acceso no autorizado");
    }
});

export default router;