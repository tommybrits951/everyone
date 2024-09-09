const User = require("../models/User")

async function getFriends(req, res) {
    try {
        const {id} = req.params;
        console.log(id)
        const user = await User.findById(String(id)).exec()
        console.log(user)
        let friends = []
        for (let i = 0; i < user.friends.length; i++) {
            let friend = await User.findById(user.friends[i]).exec()
            friends = [...friends, friend]
        }
        if (friends.length === user.friends.length) {
            res.status(200).json(friends)
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = getFriends