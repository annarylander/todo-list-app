const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", require("./routes/userRoutes"));
app.use("/todos", require("./routes/todoRoutes"));

mongoose.connect("mongodb://localhost/todolist");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
