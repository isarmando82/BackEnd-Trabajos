import winston from "winston";
import config from "./enviroment.config.js";
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "grey"
    }
}

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple())
        })
    ]

});

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple())
        }),
        new winston.transports.File({
            filename: './errors.log', level: 'error', format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()),
                
        })
    ]

});

export const addLogger = (req, res, next) => {
    if (config.enviroment === 'prod') {
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    req.logger.http(`IP: ${req.ip} - ${req.method} - ${req.url} - ${new Date().toLocaleString()}`);
    next();
}

export const useLogger = () => {
    if (config.enviroment === 'prod') {
        return prodLogger;
    } else {
        return devLogger;
    }
}