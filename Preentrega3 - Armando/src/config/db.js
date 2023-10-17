import mongoose from "mongoose";
import envConfig from "./env.config.js";


export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectMongoDB();
} 

    static getInstance() {
        if (this.#instance) {
            console.log("La conexión a la base de datos ya exite");
        }else{
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {  
        try {
            await mongoose.connect(envConfig.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                w: 1,
            })
            console.log("Conectado con exito a MongoDB usando Moongose.");
        } catch (error){
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();   
        }
    }
}

