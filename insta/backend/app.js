const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const followRoutes = require("./routes/follow");
const feedRoutes = require("./routes/posts");

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
app.use("/images", express.static(path.join("images")));

app.set('x-powered-by', false);
app.set('trues-proxy', true);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('view cache', true);

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

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users', postRoutes);
app.use("/api/v1/users", commentRoutes);
app.use("/api/v1/users", commentRoutes);
app.use("/api/v1/users", likeRoutes);
app.use("/api/v1/users", followRoutes);
app.use("/api/v1/posts", feedRoutes);


// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: createdPost._id
//     });
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });

// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({
//     _id: req.params.id
//   }).then(result => {
//     console.log(result);
//     res.status(200).json({
//       message: "Post deleted!"
//     });
//   });
// });

app.listen(3000, function(){
  console.log("listening to port 3000");
});

module.exports = app;
