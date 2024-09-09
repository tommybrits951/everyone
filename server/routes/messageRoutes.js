const router = require('express').Router()
const controller = require("../controllers/messageController")


router.route("/")
.get()
.post(controller.insertMessage)
.patch()
.delete()


module.exports = router