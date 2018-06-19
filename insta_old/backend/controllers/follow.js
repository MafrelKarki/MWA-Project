const User = require('../models/user');

exports.getAllFollowersOfAUser = (req, res, next) =>{
  var userId = req.params.userid;

  User.findById(userId)
  .populate({
    path: 'followers',
    model: 'User',
    select: {
      _id: 1,
      fullName: 1,
      email: 1,
      dob: 1,
      profilePicUrl: 1,
      createdAt: 1,
      updatedAt: 1

    }
  }).exec((err, user) => {
    res.status(200).send({
        followers: user.followers
    })
  });
}

exports.getAllFollowingsOfAUser = (req, res, next) =>{
  var userId = req.params.userid;
  User.findById(userId)
  .populate({
    path: 'followings',
    model: 'User',
    select: {
      _id: 1,
      fullName: 1,
      email: 1,
      dob: 1,
      profilePicUrl: 1,
      createdAt: 1,
      updatedAt: 1

    }
  }).exec((err, user) => {
    res.status(200).send({
        followings: user.followings
    })
  });
}

exports.followAUser = (req, res, next) =>{
  var userId = req.params.userid;
  var followerId = req.params.followerid;

  User.findById(userId, (err, followingUser) => {
    User.findById(followerId, (err, follower) => {
      Promise.all([follower.follow(followingUser._id), followingUser.addFollower(follower._id)]).then((data) => {
        return res.status(200).send({
          message: data[0]['type'] === 'follow' ? `You're now following @${followingUser.fullName}.` : `You stopped following @${followingUser.fullName}`,
          data: data[0]['type']
        });
      }).catch(err => {
        return res.status(500).send({
          code: 2000,
          message: 'There was a problem following user'
        });
      });

    });
  });

  console.log("I'm user "+followerId+" and I'm following a user "+userId);
}

exports.unfollowAUser = (req, res, next) =>{
  var userId = req.params.userid;
  var unfollowerId = req.params.unfollowerid;

  console.log("I'm user "+unfollowerId+" and I'm unfollowing a user "+userId);
}
