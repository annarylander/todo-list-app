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

const getDetails = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id });
  res.json(todo);
};

module.exports = {
  createTodo,
  getAllTodos,
  getCompletedTodos,
  completeTodo,
  getDetails,
};
