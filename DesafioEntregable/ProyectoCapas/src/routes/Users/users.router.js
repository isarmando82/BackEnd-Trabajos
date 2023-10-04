import { Router } from 'express';
import {registerController, loginController, logoutController, gitHubCallbackController} from "../../controllers/user.controller.js";

import passport from 'passport';



const router = Router();


router.post("/register", registerController );

router.post('/login', loginController)

router.get('/logout', logoutController)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}),gitHubCallbackController)

router.get('/error', (req, res) => {
    res.render('error', {error: "No se pudo autenticar el usuario usando GitHub"})
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al registrar el usuario" })
})
router.get("/fail-login", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al loguear el usuario" })
})



router.get('/private/:role', auth, (req, res) =>{
    res.send("Si estas viendo esto es porque pasaste la autorización a este recurso!");
});


function auth(req, res, next){
    const role = req.params.role;
    console.log("el req.user del aut para ver si es admin es: ", role);
    if (role === "admin") {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
    
}



export default router;

