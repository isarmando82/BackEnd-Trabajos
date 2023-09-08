import {Router} from 'express';
import cookieParser from 'cookie-parser';
import Productcontroller from "../controllers/product.controller.js";
import Cartcontroller from "../controllers/cart.controller.js";

const router = Router();

router.get('/products', Productcontroller.viewProducts)
router.get('/products/:pid', Productcontroller.viewProductsById)
router.get('/carts/:cid', Cartcontroller.viewCartProducts)

//router.use(cookieParser());
router.use(cookieParser("CoderS3cr3tC0d3"));

router.get('/',(req,res)=>{
    res.render('index',{})
});

//Auth middleware:
function auth(req, res, next){
    if (req.session.user === 'admin' && req.session.admin) {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
    
}

router.get('/private', auth, (req, res) =>{
    res.send("Si estas viendo esto es porque pasaste la autorización a este recurso!");
});

export default router;