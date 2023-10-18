import __dirname from '../../../utils.js';
import fileSystem from 'fs';

export class MessageManager {
    #messagesPath;

    constructor() {
        this.#messagesPath = __dirname + '/data/messages.json';
    }
    async getMessages() {
        if (!fileSystem.existsSync(this.#messagesPath)) {
            await fileSystem.promises.writeFile(this.#messagesPath, "[]");
        }
        const messages = await fileSystem.promises.readFile(this.#messagesPath, 'utf-8');
        return JSON.parse(messages);
    }

    async writeMessage(userId, messageTxt) {
        let messages = await this.getMessages();
        const message = {
            user: userId,
            message: messageTxt
        }
        messages.push(message);
        await this.saveMessages(messages);
        return '{"status": "ok", "message": "Message created successfully"}';
    }
    saveMessages = async (message) => {
        fileSystem.promises.writeFile(this.#messagesPath, JSON.stringify(message));
    }
}