const { User } = require("../models/User");
const { Todo } = require("../models/Todo");
const { requireLogin } = require("./auth");

const createTodo = async (req, res) => {
  const { task, detail } = req.body;
  try {
    const todo = await Todo.create({
      task: task,
      detail: detail,
      author: req.user.userId,
    });
    res.status(201).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const getAllTodos = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const todos = await Todo.find({ author: req.user.userId, completed: false })
      .populate("author.username")
      .sort({ published: -1 });
    res.json({ todos: todos });
  } catch {
    res.status(400);
  }
};

const getCompletedTodos = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const todos = await Todo.find({ author: req.user.userId, completed: true })
      .populate("author.username")
      .sort({ published: -1 });
    res.json({ todos: todos });
  } catch {
    res.status(400);
  }
};

const completeTodo = async (req, res) => {
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
};

const resetTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.updateOne(
      { _id: id },
      { $set: { completed: false } }
    );
    res.status(201).json({ message: "reset done" });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const getDetails = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id });
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  let updatedTodo = {};

  if (req.body.task != "") {
    updatedTodo.task = req.body.task;
  }

  if (req.body.detail != "") {
    updatedTodo.detail = req.body.detail;
  }

  // fixa om fil tom
  // if (req.body.file != "") {
  //   updatedTodo.file = `http://localhost:8000/uploads/${req.file.filename}`;
  // }

  const todo = await Todo.updateOne(
    { _id: id },
    {
      $set: updatedTodo,
    }
  );

  await Todo.updateOne(
    { _id: id },
    {
      $addToSet: { file: `http://localhost:8000/uploads/${req.file.filename}` },
    }
  );
  res.status(201).json({ message: "update done" });
};

const removeFile = async (req, res) => {
  const { id } = req.params;
  console.log(req.body.image);
  await Todo.updateOne({ _id: id }, { $pull: { file: req.body.file } });
  res.status(201).json({ message: "file removed" });
};

const searchTodo = async (req, res) => {
  console.log("search");
  const results = await Todo.find({ $text: { $search: req.body.query } });
  res.status(201).json({ results });
};

module.exports = {
  createTodo,
  getAllTodos,
  getCompletedTodos,
  completeTodo,
  getDetails,
  updateTodo,
  resetTodo,
  removeFile,
  searchTodo,
};
