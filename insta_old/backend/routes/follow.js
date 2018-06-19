const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow');

router.get('/:userid/followers', followController.getAllFollowersOfAUser);
router.get('/:userid/followings', followController.getAllFollowingsOfAUser);
router.post('/:userid/follow/:followerid', followController.followAUser);
// router.delete('/:userid/follow/:unfollowerid', followController.unfollowAUser);

module.exports = router;
