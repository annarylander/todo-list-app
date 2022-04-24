const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const bodyParser = require("body-parser");

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      password: password,
    });
    res.status(201).json({ username });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Problem to register" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.login(username, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: username },
      process.env.JWT_SECRET,
      {
        expiresIn: "60h",
        subject: userId,
      }
    );
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
};

const currentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.json(user);
};

module.exports = { createUser, loginUser, currentUser };
