const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.user.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
  }
};

module.exports = { authUser };
