import passport from "passport";
import envCongif from "./env.config.js";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import userModel from "../services/dao/mongo/models/userModel.js";
import {PRIVATE_KEY } from "../utils.js";


const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = jwtStrategy.ExtractJwt;

const initializePassport = () => {   
    
    passport.use('jwt', new JwtStrategy(
        {  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY,
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }));


    passport.use('github',new GitHubStrategy({
        clientID: envCongif.gitHubClientId,
        clientSecret: envCongif.gitHubClientSecret,
        callbackURL: envCongif.gitHubCallbackUrl,
    
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email});
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    age: "",
                    password: "",
                    logedBy: "GitHub"
                    }
                const result = await userModel.create(newUser);
                return done(null, result);
            }else{
                return done(null, user);
            }

        } catch (error) {
            return done("Error registrando al usuario" + error);
        }
    }));

    //serializacion y deserializacion
    passport.serializeUser((user, done) => {
        const serializedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            };
        done(null, serializedUser);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando al usuario" + error);
        }});

};

const cookieExtractor=(req)=> {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwtCookieToken"];
    }
    return token;
};

export default initializePassport;