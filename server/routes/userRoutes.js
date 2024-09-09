const router = require("express").Router()
const controller = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")



router.route("/")
.post(controller.createUser)
.get(verifyJWT, controller.getAllUsers)
.delete(controller.deleteUser)
.patch(controller.updateUser)

router.get("/:id", controller.getUser)

router.use((err, req, res, next) => {
    return res.status(500).json({message: err.message || "User Error!"})
})

module.exports = router