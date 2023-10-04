import UserServices from '../services/user.services.js';

const services = new UserServices();


export  const  registerController = async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    };
    const result = await services.save(user);
    res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id });
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        await services.login(email, password, res);    
        return res.status(200).send({message: "Usuario logueado con exito" });
    
    } catch (error) {
        return res.status(500).send({ status: 'error', message: "Error interno de la aplicacion, controller" })
    }
}



export const gitHubCallbackController = async (req, res) => {
    const user = req.user;
    await services.gitHubLogin(user, res);
}


export const logoutController = async (req, res) => {
    await services.logout('jwtCookieToken', res);   
    }