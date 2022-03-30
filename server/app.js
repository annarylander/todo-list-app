const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/User");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body.user;
  try {
    const user = await User.create({
      username: username,
      password: password,
    });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Problem to register" });
  }
});

mongoose.connect("mongodb://localhost/todolist");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
