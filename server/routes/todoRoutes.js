const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getCompletedTodos,
  completeTodo,
} = require("../controllers/todo");
const { authUser } = require("../controllers/auth");

router.post("/", authUser, createTodo);
router.get("/", authUser, getAllTodos);
router.get("/completed", authUser, getCompletedTodos);
router.put("/:id", authUser, completeTodo);

module.exports = router;
