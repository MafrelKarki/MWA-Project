const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");

const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const searchRoutes = require("./routes/searchUser");

const followRoutes = require("./routes/follow");

const app = express();

mongoose
  .connect(
    "mongodb://localhost:27017/instanonymous"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/v1/users", commentRoutes);
app.use("/api/v1/users", likeRoutes);
app.use("/api/v1/users", searchRoutes);
app.use("/api/v1/users", postRoutes);
app.use("/api/v1/users", followRoutes);

module.exports = app;
