import { connect } from "mongoose";

// const url = 'mongodb+srv://isarmando82:NN0L5NynUUdkBi79@cluster0.sgsowkc.mongodb.net/ecommerce'
const url = 'mongodb://0.0.0.0:27017/ecommerce'

const dbConnection = async () => {
    try {
        console.log('db conectada');
        return await connect(url)
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbConnection