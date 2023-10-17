import {userService} from '../services/factory.js';


export  const  registerController = async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    };
    const result = await userService.save(user, res);
    res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id});
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        await userService.login(email, password, res);    
        return res.status(200).send({message: "Usuario logueado con exito" });
    
    } catch (error) {
        return res.status(500).send({ status: 'error', message: "Error interno de la aplicacion, controller" })
    }
};

export const logAuthenticate = async (req, res) => {
    let page = parseInt(req.query.page);
    if(req.user.role === 'admin'){
        await userService.loginAdmin(req, res)
    }else{
        if (!page) page = 1;
        await userService.loginShowProducts(page, req, res)
    }
};


export const gitHubCallbackController = async (req, res) => {
    const user = req.user;
    await userService.gitHubLogin(user, res);
}

export const logoutController = async (req, res) => {
    await userService.logout('jwtCookieToken', res);   
}
