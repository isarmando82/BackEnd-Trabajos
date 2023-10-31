import mongoose from 'mongoose'
import config from './enviroment.config.js';
import { useLogger } from './logger.config.js';

const log = useLogger();

export default class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getIntance() {
        if (this.#instance) {
            log.info(`${new Date().toLocaleString()} Ya se ha abierto una conexión a MongoDB`);
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, w: 1 })
            log.info(`${new Date().toLocaleString()} Conectado con éxito a MongoDB`);
        } catch (error) {
            log.fatal(`${new Date().toLocaleString()} no se pudo conectar a MongoDB`);
            process.exit();
        }
    }
}