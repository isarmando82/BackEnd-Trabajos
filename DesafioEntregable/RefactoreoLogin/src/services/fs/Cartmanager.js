import fs from "fs"
import __dirname from "../../utils.js"
import readDb from "./Readdb.js"
import Cart from "./models/Cart.js"

class CartManager{
    #cartList
    #cartDirPath
    #cartFilePath

    constructor(){
        this.#cartList = new Array()
        this.#cartDirPath = __dirname + '../Data'
        this.#cartFilePath = this.#cartDirPath + "/carts.json"
    }

    

    newCart = async () => {
        try {
            let listaCarts = await readDb(this.#cartDirPath, this.#cartFilePath);
            this.#cartList = JSON.parse(listaCarts);
    
            let newCart = new Cart();
            if (!this.#cartList.length) {
                newCart.id = 1
            } else {
                let ultimoId = this.#cartList.at(-1)   
                newCart.id = ultimoId.id + 1
            }

            this.#cartList.push(newCart);
    
            await fs.promises.writeFile(this.#cartFilePath, JSON.stringify(this.#cartList, null, '\t'));

    
            return newCart;
        } catch (err) {
            console.log(`El carrito no pudo crearse debido a ${err}`);
        }
    };

    getCarts = async () =>{
        try {
            if( await fs.existsSync(this.#cartFilePath)){
                const listaCart = await fs.promises.readFile(this.#cartFilePath, 'utf-8')
                const listaCartObj = JSON.parse(listaCart)
                return listaCartObj    
            }else{
                const listaCartNueva = new Array
                await fs.promises.writeFile(this.#cartFilePath, JSON.stringify(listaCartNueva))
                return listaCartNueva
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    updtCarts = async (listaCartActualizada) => {
        try {
            if(await fs.existsSync(this.#cartFilePath)){
                await fs.promises.writeFile(this.#cartFilePath, JSON.stringify(listaCartActualizada))
                return console.log('carritos actualizados')    
            }
        } catch (error) {
            console.log('error al escribir lista de carritos')
        }
    }
}


export default CartManager