const express = require('express');
const postController = require('../controllers/post');
const router = express.Router();
const { check } = require('express-validator/check');

router.get("/:userid/posts", postController.getAllPostsByAUser);
router.get("/:userid/posts/:postid", postController.getOnePostByAUserByPostId);
router.post("/:userid/posts",[
  check('')
], postController.createPost);
router.put("/:userid/posts/:postid", postController.updatePost);
router.delete("/:userid/posts/:postid", postController.deletePost);



module.exports = router;
