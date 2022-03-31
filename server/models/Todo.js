const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  published: { type: Date, default: Date.now, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
