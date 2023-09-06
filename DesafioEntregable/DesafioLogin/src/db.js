import mongoose from "mongoose";

const db = 'desafiologin'



// const url = 'mongodb+srv://isarmando82:NN0L5NynUUdkBi79@cluster0.sgsowkc.mongodb.net/Pre-entrega2'

const server = `mongodb://0.0.0.0:27017/${db}`


export const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(server);
        console.log("Conectado con exito a MongoDB usando Moongose.")
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}