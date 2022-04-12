const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { Todo } = require("./models/Todo");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const requireLogin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("inloggad");
    console.log(token);
    console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
  }
};

// create user
app.post("/users", async (req, res) => {
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
});

//log in user and create token
app.post("/users/login", async (req, res) => {
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
});

//Create a new a new todo
app.post("/todos", requireLogin, async (req, res) => {
  const { task } = req.body;
  try {
    const todo = await Todo.create({
      task: task,
      author: req.user.userId,
    });
    res.status(201).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

// List all todos
app.get("/todos", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const todos = await Todo.find({ author: req.user.userId })
      .populate("author.username")
      .sort({ published: -1 });
    res.json({ todos: todos });
  } catch {
    res.status(400);
  }
});

// List all completed todos
app.get("/todos/completed", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const todos = await Todo.find({ author: req.user.userId, completed: true })
      .populate("author.username")
      .sort({ published: -1 });
    res.json({ todos: todos });
  } catch {
    res.status(400);
  }
});

// complete a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.updateOne(
      { _id: id },
      { $set: { completed: true } }
    );
    res.status(201).json({ message: "done" });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

//current user
app.get("/users", requireLogin, async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.json(user.username);
});

mongoose.connect("mongodb://localhost/todolist");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
