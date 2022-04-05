const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    default: Date.now,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;