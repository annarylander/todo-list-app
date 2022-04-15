const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getCompletedTodos,
  completeTodo,
  getDetails,
} = require("../controllers/todo");
const { authUser } = require("../controllers/auth");

router.post("/", authUser, createTodo);
router.get("/", authUser, getAllTodos);
router.get("/completed", authUser, getCompletedTodos);
router.put("/:id", authUser, completeTodo);
router.get("/:id", getDetails);

module.exports = router;
