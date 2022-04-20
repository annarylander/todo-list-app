const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createTodo,
  getAllTodos,
  getCompletedTodos,
  completeTodo,
  getDetails,
  updateTodo,
} = require("../controllers/todo");
const { authUser } = require("../controllers/auth");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const file = multer({ storage: storage }).single("file");

router.post("/", authUser, createTodo);
router.get("/", authUser, getAllTodos);
router.get("/completed", authUser, getCompletedTodos);
router.put("/:id", authUser, completeTodo, updateTodo);
router.post("/:id", authUser, file, updateTodo);
router.get("/:id", getDetails);

module.exports = router;
