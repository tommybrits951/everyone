const jwt = require("jsonwebtoken")
const User = require("../models/User")



async function verifyJWT(req, res, next) {
    try {
        const { authorization } = req.headers
        
        const token = authorization.split(" ")[1]
        console.log(token)
        const match = jwt.verify(JSON.parse(token), process.env.ACCESS_TOKEN_SECRET)
        
        
        if (!match) {
            res.status(401).json({message: "Not authorized!"})
        }
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = verifyJWT