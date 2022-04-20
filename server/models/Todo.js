const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
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

  file: {
    type: Array,
    required: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
