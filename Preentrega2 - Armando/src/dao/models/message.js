import { Schema, model } from 'mongoose'

const messageCollection = 'messages'
const MessageSchema = Schema({    
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    }
})

const MessageModel = model(messageCollection, MessageSchema)

export default MessageModel