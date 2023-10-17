import fs from 'fs';
import { __dirname } from '../../../utils.js';
import User from './models/userModel.js';
import { createHash } from '../../../utils.js';
import productService from "./product.services.js";
import { isValidPassword } from '../../../utils.js';
import { generateToken } from '../../../utils.js';
import envConfig from '../../../config/env.config.js';

const PORT = envConfig.port;

export default class UserService {
    #users;
    #userDirPath;
    #userFilePath;
    #fileSystem;

    constructor() {
        this.#users = new Array();
        this.#userDirPath = __dirname + "/Data";
        this.#userFilePath = this.#userDirPath + "/Users.json";
        this.#fileSystem = fs;
    }


    isEmailDuplicated(email) {
        return this.#users.some(user => user.email === email);
    }

    generateId() {
        return (new Date()).getTime();
    }

    #preparararDirectorioBase = async () => {
        console.log("ingreso a preparar directorio base");
        await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true });
        if (!this.#fileSystem.existsSync(this.#userFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#userFilePath, '[]');
        }; 
        let usersFile = await this.#fileSystem.promises.readFile(this.#userFilePath, 'utf-8');
            this.#users = JSON.parse(usersFile);
    }

    save = async (user) => {
        let id = this.generateId();
        let loggedBy = 'WebPage';
        let role = 'user';
        let newUser = new User(user.first_name, user.last_name, user.email, user.age, user.password = createHash(user.password), loggedBy = loggedBy, role = role, id = id);
        console.log(newUser);
        try {
            await this.#preparararDirectorioBase()
            if (this.isEmailDuplicated(newUser.email)) {
                return { error: 'El codigo del producto ya existe' };
            }
            let response = { ...newUser};
            console.log(response);
            this.#users.push(response);
            await this.#fileSystem.promises.writeFile(this.#userFilePath, JSON.stringify(this.#users, null, 2));
            return response;
        }
        catch (error) {
            console.error(`Error al crear el usuario nuevo: ${JSON.stringify(newUser)}, detalle del error: ${error}`);
            throw Error(`Error al crear el usuario nuevo: ${JSON.stringify(newUser)}, detalle del error: ${error}`);
        }
    }

    login = async (email, password, res) => {
        try {
            await this.#preparararDirectorioBase();
            let exists = this.#users.find(user => user.email === email);
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
            
            res.cookie('jwtCookieToken', accessToken, {
                maxAge: 60000,  
                httpOnly: true, 
            })
        }
        catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
            throw Error(`Error al obtener los productos: ${error}`);
        }
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

    loginShowProducts = async (req ,res) => {
        let user = req.user;
        console.log(user);
        let result = await productService.getAllProducts();
            return res.render('profile', result)            
    };



}






