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
router.put("/completed/:id", authUser, resetTodo);
router.put("/:id", authUser, removeFile, completeTodo);
router.post("/:id", authUser, file, updateTodo);
router.get("/:id", getDetails);

module.exports = router;
