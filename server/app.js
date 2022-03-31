const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { Todo } = require("./models/Todo");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

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

app.post("/users/login", async (req, res) => {
  const { username, password } = req.body.user;
  const user = await User.login(username, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: user.username },
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
});

app.post("/todos", async (req, res) => {
  const { title, body } = req.body.todo;
  try {
    const todo = await Todo.create({
      title: title,
      body: body,
    });
    res.status(201).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

mongoose.connect("mongodb://localhost/todolist");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
