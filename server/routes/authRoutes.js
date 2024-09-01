const router = require("express").Router()
const controller = require('../controllers/authController')


router.route("/")
.post(controller.loginUser)


module.exports = router