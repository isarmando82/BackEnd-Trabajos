import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import { cartManager, userManager } from '../services/factory.js';
import { UserDTO } from '../services/dao/dto/user.dto.js';


const localStrategy = passportLocal.Strategy;
const initializePassport = () => {


    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.18d89fcaadccf1b0',
            clientSecret: '20976c73e51aebad8637bee88bda91126f7dad80',
            callbackUrl: 'http://localhost:8080/api/sessions/github-callback'
        },
        async (accessToken, refreshToken, profile, done) => {

            try {
                const user = await userManager.getUserByEmail(profile._json.email);
                if (!user) {
                    
                    const cartId = await cartManager.createCart();
                    const cartParsed = JSON.parse(cartId);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '{GitHub}',
                        age: '21', 
                        email: profile._json.email,
                        password: '',
                        registerMethod: "GitHub",
                        role: "user",
                        cartId: cartParsed.createdCartId
                    }
                    
                    const result = await userManager.createUser(new UserDTO(newUser));
                    result.rol = "Usuario";
                    done(null, result)
                }
                else {
                    user.rol = "Usuario";
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }));

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const exists = await userManager.getUserByEmail(email);
                if (exists) {
                    
                    return done(null, false);
                }
                const cartId = await cartManager.createCart();
                const cartParsed = JSON.parse(cartId);
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    registerMethod: "App-Local",
                    role: "Usuario",
                    cartId: cartParsed.createdCartId
                };
                
                const result = await userManager.createUser(new UserDTO(user));
                return done(null, result);
            } catch (error) {
                console.log(error.message);
            }
        }
    ));

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
            try {
                let user = false;
                if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
                    user = { _id: '64ed06ae2254d09457e26b9a', first_name: 'Admin', last_name: 'Coder', email: 'adminCoder@coder.com', age: 99, role: "Admin", cartId: 'DummyCart' }
                } else {
                   user = await userManager.getUserByEmail(email);
                    if (!user) {
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false);
                    }
                    if (!user.role) {
                        user.role = "Usuario";
                    }
                }
                return done(null, user);

            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userManager.getUserById(id);
            done(null, user);
        } catch (error) {
            console.error("ERROR: " + error);
        }
    });
};

export default initializePassport;