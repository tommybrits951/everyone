const User = require("../models/User");
const bcrypt = require("bcrypt");
const { format } = require("date-fns");

async function createUser(req, res, next) {
  try {
    const { first_name, last_name, dob, postal, phone, email, password } =
      req.body;
    if (!first_name || !dob || !postal || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
    
    console.log(first_name)
    const dupPhone = await User.findOne({phone}).lean().exec()
    if (dupPhone) {
        return res
          .status(400)
          .json({ message: "Phone number already in use!" });
    }
    const dupEmail = await User.findOne({email}).lean().exec()
    if (dupEmail) {
        return res
          .status(400)
          .json({ message: "Email already in use!" });
    }
    const date_joined = format(new Date(), "MM/dd/yyyy");
    const hash = await bcrypt.hash(password, 10);
    const friends = [];
    const userObj = {
      first_name,
      last_name,
      dob,
      postal,
      phone,
      email,
      password: hash,
      date_joined,
      friends,
    };
    const results = await User.create(userObj)
    if (results) {
        res.status(201).json({message: `User ${first_name} created!`})
    }
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().exec()
    if (!users) {
        next()
    }
  } catch (err) {
    next(err);
  }
}
async function updateUser(req, res, next) {
  try {
    const _id = req.body.id
    const userObj =await User.updateOne({_di},{...req.body, id: undefined, _id})
    if (userObj) {
      res.status(201).json(userObj)    
    }  
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const _id = req.body.id
    const result = await User.deleteOne({_id})
    if (result) {
      res.status(201).json({message: `User ${req.body.first_name} deleted!`})
    }
    console.log("other way")
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
};
