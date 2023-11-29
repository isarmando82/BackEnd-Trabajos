import { messageManager } from "../services/factory.js";

const getRenderChatController = async (req, res) => {
    res.render('chat');
}

const postNewChatController = async (req, res) => {
    const userName = req.body.userName;
    const message = req.body.message;
    if (userName && message) {
        const result = await messageManager.writeMessage(userName, message);
        res.send(result);
    } else {
        res.send('{"status":"failed", "message":"Incomplete params"}');
    }
}


export { getRenderChatController, postNewChatController }