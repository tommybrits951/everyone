const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    dob: {
        type: Date,
        required: true
    },
    postal: {
        type: Number,
        required: true,
        length: 5
    },
    date_joined: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        length: 10
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image_path: String,
    friends: [{type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("User", userSchema)