const mongoose = require("mongoose")
const {v4: uuid} = require("uuid")
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recipients: [{
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    conversation_id: {
        type: String,
        default: uuid()
    },
    subject: String,
    text: {
        type: String,
        required: true
    },
    images: [{
        name: String,
        path: String
    }]
    
})

module.exports = mongoose.model("Message", messageSchema)