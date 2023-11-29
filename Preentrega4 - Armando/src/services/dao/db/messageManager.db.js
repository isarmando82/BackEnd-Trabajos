import { messagesModel } from '../db/models/messages.model.js';
export class MessageManager {
    constructor() {
        this.messages = [];
    }

    async getMessages() {
        try {
            const messages = await messagesModel.find({});
            return messages;
        } catch (error) {
            console.log(error);
        }
    }

    async writeMessage(userId, message) {
        try {
            await messagesModel.create({ user: userId, message: message });
            return '{"status": "ok", "message": "Message created successfully"}';
        } catch (error) {
            console.log(error);
            return '{"status": "failed", "message": "Error when creating message"}';
        }
    }
}