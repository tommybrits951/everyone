const User = require("../models/User");
const bcrypt = require("bcrypt");
const { format } = require("date-fns");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

async function createUser(req, res, next) {
  try {
    const { first_name, last_name, dob, postal, phone, email, password } =
      req.body;
    const img = req.files;
    if (!first_name || !dob || !postal || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
    if (phone) {
      const dupPhone = await User.findOne({ phone }).lean().exec();
      if (dupPhone) {
        return res
          .status(400)
          .json({ message: "Phone number already in use!" });
      }
    }
    const dupEmail = await User.findOne({ email }).lean().exec();
    if (dupEmail) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    const date_joined = format(new Date(), "MM/dd/yyyy");
    const hash = await bcrypt.hash(password, 10);
    
    const userObj = {
      first_name,
      last_name,
      dob,
      postal,
      phone,
      email,
      password: hash,
      date_joined,
      friends: []
    };
    const results = await User.create(userObj);
    if (img) {
      const filePath = path.join(__dirname, "..", "images", `${results._id}`);
      const fileName = `${email}${results._id}${path.extname(
        String(img.img.name)
      )}`;

      if (
        !fs.existsSync(path.join(__dirname, "..", "images", `${results._id}`))
      ) {
        fsPromises.mkdir(filePath);
      }
      fsPromises.appendFile(path.join(filePath, fileName), img.img.data);
      let filed = await User.updateOne(
        { _id: results._id },
        { image_path: `${results._id}/${fileName}` }
      );
      if (!filed) {
        return res.status(500).json({ message: "Failed to save image!" });
      }
    }
    if (results) {
      res.status(201).json({ message: `User ${first_name} created!` });
    }
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().exec();
    if (!users) {
      next();
    }
  } catch (err) {
    next(err);
  }
}
async function updateUser(req, res, next) {
  try {
    const _id = req.body.id;
    const userObj = await User.updateOne(
      { _id },
      { ...req.body, id: undefined, _id }
    );

    if (userObj) {
      res.status(201).json(userObj);
    }
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const _id = req.body.id;
    const result = await User.deleteOne({ _id });
    if (result) {
      res.status(201).json({ message: `User ${req.body.first_name} deleted!` });
    }
  } catch (err) {
    next(err);
  }
}
async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({ message: "Need User Id." });
    }
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ message: "Couldn't find User!" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
};
