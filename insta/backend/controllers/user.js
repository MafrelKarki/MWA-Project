const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator/check');
// const queryString = require('querystring');


const User = require("../models/user");

exports.createUser = (req, res, next) => {
  console.log('inside user signup page');
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      dob:"",
      profilePicUrl: "",
      gender: "",
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      location:{
                longitude: 0,
                latitude: 0
      }
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  console.log('inside user login page');

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }

  let fetchedUser;
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign({
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        "secret_this_should_be_longer", {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.getAllUser = (req, res, next) => {
  User.find().then(result => {
    res.status(200).json({
      users: result
    })
  }).catch(err => {
    res.status(204).json({
      message: "Users not available"
    });
  });

}

exports.getUser = (req, res, next) => {
  var userId = req.params.userid;

  User.findById(userId).then(result => {

    res.status(200).json({
      user: result
    })
  }).catch(err =>{
    res.status(204).json({
      message: "Something wrong with the retrieval"
    });
  })


  // console.log("Retrieving user with userid " + userId);
}

exports.updateUser = (req, res, next) => {

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }

  var userId = req.params.userid;
  User.findByIdAndUpdate(
    userId,
    req.body,
    {new: true},
    (err, updatedUser) => {
      if(err){
        return res.status(500).send({
          message: 'Error updating data'
        });
      }
      return res.status(200).send({
        message: 'User has been updated!',
        data: updatedUser
      });
    }

  ).catch(err => {
    return res.status(500).send({
      message: err
    });
  });

  console.log("Updating user with userid " + userId);
}

exports.deactivateUser = (req, res, next) => {
  var userId = req.params.userid;
  User.findByIdAndUpdate(userId, {"isActive":false}, {new:true}, function(err, updatedUser){
    if(err){
      return res.status(500).send({
        message: 'Error Deactivating user'
      });
    }
    return res.status(200).send({
      message: 'User has been Deactivated!',
      data: updatedUser
    });
  })
  console.log("deactivating user with userid " + userId);
}
