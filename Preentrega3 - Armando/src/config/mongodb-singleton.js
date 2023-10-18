import mongoose from 'mongoose'
import config from './enviroment.config.js';


export default class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getIntance() {
        if (this.#instance) {
            console.log("Ya se ha abierto una conexión a MongoDB");
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, w: 1 })
            console.log("Conectado con exito a la DB");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
}