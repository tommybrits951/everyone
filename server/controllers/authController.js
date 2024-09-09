const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

function buildAccessToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    first_name: user.first_name,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
}
function buildRefreshToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    first_name: user.first_name,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
    const user = await User.findOne({ email }).exec();
    const match = await bcrypt.compare(password, user.password);
    if (!match || !user) {
      return res.status(401).json("Incorrect email or password!");
    }
    const refreshToken = buildRefreshToken(user);
    const accessToken = buildAccessToken(user);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    res.json({ ...user._doc, password: undefined, accessToken });
  } catch (err) {
    next(err);
  }
}

async function checkRefresh(req, res, next) {
  try {
    const jwtCookie = req.cookies.jwt;
    if (!jwtCookie) {
      return res.status(401).json({ message: "Not authorized!" });
    }
    const { id, exp } = jwt.decode(jwtCookie, process.env.REFRESH_TOKEN_SECRET);
    const current = Math.ceil(new Date().getTime() * 0.001);
    const user = await User.findById(id).exec();
    if (user) {
      const accessToken = buildAccessToken(user);
      res.json({ ...user._doc, id: user._doc._id, accessToken });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  loginUser,
  checkRefresh,
};
