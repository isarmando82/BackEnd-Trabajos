import { messagesModel } from '../db/models/messages.model.js';
import { useLogger } from "../../../config/logger.config.js";

export class MessageManager {
    constructor() {
        this.messages = [];
    }

    async getMessages() {
        try {
            const messages = await messagesModel.find({});
            return messages;
        } catch (error) {
            const log = useLogger();
            log.error(`${new Date().toLocaleString()}: Error al obtener los mensajes: ${error}`);
        }
    }

    async writeMessage(userId, message) {
        try {
            await messagesModel.create({ user: userId, message: message });
            return '{"status": "ok", "message": "Message created successfully"}';
        } catch (error) {
            const log = useLogger();
            log.error(`${new Date().toLocaleString()}: Error al guardar el mensaje: ${error}`);
            return '{"status": "failed", "message": "Error when creating message"}';
        }
    }
}