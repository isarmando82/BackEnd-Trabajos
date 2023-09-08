import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../services/db/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2'


// declaracion de estrategia
const localStrategy = passportLocal.Strategy

const initializePassport = () => {

//HithubPassport

passport.use('github', new GitHubStrategy(
    {
        clientID: 'Iv1.18d89fcaadccf1b0',
        clientSecret: '20976c73e51aebad8637bee88bda91126f7dad80',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("Profile obtenido del usuario: ");
        console.log(profile);

        try {
            const user = await userModel.findOne({ email: profile._json.email })
            console.log("Usuario encontrado para login:");
            console.log(user);

            if (!user) {
                console.warn("User doesn't exists with username: " + profile._json.email);
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: '',
                    loggedBy: "GitHub"
                }
                const result = await userModel.create(newUser)
                done(null, result)
            }
            else {
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))





    //LocalPassport
    // Register
    passport.use('register', new localStrategy(
       
        { passReqToCallback: true, usernameField: 'email' },

        async (req, username, password, done) => {
            // Logica que teniamos en session.router
            const { first_name, last_name, email, age } = req.body;
            try {
             // Verificamos si el correo electrónico comienza con "admin" para asignar el rol correspondiente
    const isAdmin = email.startsWith('admin');
    const role = isAdmin ? 'admin' : 'user';

    const exists = await userModel.findOne({ email });

    if (exists) {
        return res.status(400).send({ status: 'error', message: 'El usuario ya existe' });
    }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    role,
                    password: createHash(password)
                }
                const result = await userModel.create(user);

                return done(null, result)

            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }

        }
    ));


    // Login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false)
                }
                // Validacion de el password
                if (!isValidPassword(user, password)) {
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ));



    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });

}



export default initializePassport;
