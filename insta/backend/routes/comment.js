const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.get("/:userid/posts/:postid/comments", commentController.getAllCommentsOnAPostByUser);
router.get("/:userid/posts/:postid/comments/:commentid", commentController.getCommentByCommentId);
router.post("/:userid/posts/:postid/comments/:commenterUserId", commentController.createCommentToAPostByUser);
router.put("/:userid/posts/:postid/comments/:commentid", commentController.updateCommentToAPostByUser);
router.delete("/:userid/posts/:postid/comments/:commentid", commentController.deleteCommentByCommentId);


module.exports = router;
