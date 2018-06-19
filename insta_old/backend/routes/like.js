const queryString = require('querystring');
const express = require('express');

const likeController = require('../controllers/like');
const router = express.Router();

router.get("/:userid/posts/:postid/likes", likeController.getAllLikesOfPost);
router.post("/:userid/posts/:postid/likes/:liker_id", likeController.likeOrUnlikeAPost);
// router.post("/:userid/posts/:postid/likes/:unliker_id", likeController.unLikeAPost);


module.exports = router;
