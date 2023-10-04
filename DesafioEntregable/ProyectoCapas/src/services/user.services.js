
import userModel from "../models/userModel.js";
import { createHash } from '../utils.js';
import { isValidPassword } from '../utils.js';
import { generateToken } from '../utils.js';

export default class UserService {

    getAll = async () => {
        let users = await userModel.find();
        return users.map(user => user.toObject());
    };

    save = async (user) => {    
    const exists = await userModel.findOne({ email:user.email });
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    };
        user.password = createHash(user.password);
        let result = await userModel.create(user);
        return result
    };


    login = async (email, password, res) => {
            const exists = await userModel.findOne({ email });
            if (!exists) {
                return console.log("Usuario no encontrado");
                }
            if (!isValidPassword(exists, password)) {
                return console.log("Los datos ingresados son incorrectos");
            }
            const tokenUser = {
                name: `${exists.first_name} ${exists.last_name}`,
                email: exists.email,
                role: exists.role,
            };
            const accessToken = generateToken(tokenUser);
            //Cookies
            res.cookie('jwtCookieToken', accessToken, {
                maxAge: 60000,  
                httpOnly: true, 
            })
    };


    logout = async (cookieName, res) => {
        res.clearCookie(cookieName);
        return res.send({ message: 'Logout exitoso' });
    };
    
    gitHubLogin = async (user, res) => {
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role,
        };
        const accessToken = generateToken(tokenUser)
        res.cookie('jwtCookieToken', accessToken, {
            maxAge: 60000,  
            httpOnly: true,
        })
    
        res.redirect('/users');
    };
}





