const express = require("express");
const router = express.Router();
const { createUser, loginUser, currentUser } = require("../controllers/user");
const { authUser } = require("../controllers/auth");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", authUser, currentUser);

module.exports = router;
