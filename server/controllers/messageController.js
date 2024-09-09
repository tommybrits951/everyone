const Message = require("../models/Message")
const { v4: uuid } = require("uuid"); 
const User = require("../models/User")
async function insertMessage(req, res, next) {
    try {
        const {sender, recipients, subject, text, images} = req.body
        const senderRes = await User.findById(sender).lean().exec()
        console.log(senderRes)
    } catch (err) {
        next(err)
    }
}
module.exports = {
    insertMessage
}