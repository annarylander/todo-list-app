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
  resetTodo,
  removeFile,
  searchTodo,
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
router.post("/search", searchTodo);
router.get("/completed", authUser, getCompletedTodos);
router.put("/completed/:id", authUser, resetTodo);
router.put("/:id", authUser, completeTodo);
router.delete("/:id", authUser, removeFile);
router.post("/:id", authUser, file, updateTodo);
router.get("/:id", getDetails);

module.exports = router;
