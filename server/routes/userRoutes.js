const router = require("express").Router()
const controller = require("../controllers/userController")



router.route("/")
.post(controller.createUser)
.get(controller.getAllUsers)
.delete(controller.deleteUser)
.patch(controller.updateUser)
router.use((err, req, res, next) => {
    return res.status(500).json({message: "User Error!"})
})

module.exports = router