import config from '../config/enviroment.config.js';
import MongoSingleton from '../config/mongodb-singleton.js';
let productManager;
let cartManager;
let messageManager;
let userManager;
let ticketManager;
async function initializeMongoService ()  {
    try {
        await MongoSingleton.getIntance();
        const { ProductManager } = await import('./dao/db/productManager.db.js');
        const { CartManager } = await import('./dao/db/cartManager.db.js'); 
        const { MessageManager } = await import('./dao/db/messageManager.db.js');
        const { UserManager } = await import('./dao/db/userManager.db.js');
        const { TicketManager } = await import('./dao/db/ticketManager.db.js');
        productManager = new ProductManager();
        cartManager = new CartManager();
        messageManager = new MessageManager();
        userManager = new UserManager();
        ticketManager = new TicketManager();
    }
    catch (error) {
        console.log(error);
    }
}

switch (config.persistence) {
    case 'mongodb':
        initializeMongoService();
        break;
    case 'file':
        //lógica para FS
        const { MessageManager } = await import('./dao/fs/messageManager.fs.js');
        const { ProductManager } = await import('./dao/fs/productManager.fs.js');
        const { CartManager } = await import('./dao/fs/cartManager.fs.js');
        const { UserManager } = await import('./dao/fs/userManager.fs.js');
        messageManager = new MessageManager();
        productManager = new ProductManager();
        cartManager = new CartManager();
        userManager = new UserManager();
        break;
    default:
        console.log("El valor introducido no es válido: " + config.persistence);
        exit(1);
}

export { productManager, cartManager, messageManager, userManager, ticketManager }