const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var SchemaTypes = mongoose.Schema.Types;

mongoose.plugin(require('mongoose-regex-search'));


const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true, searchable: true, index: true},
    password: { type: String, required: true },
    dob: {type: Date},
    profilePicUrl: {type: String},
    location: {
                longitude: { type: Number },
                latitude: { type: Number }
              },
    gender: { type: String },
    followers: [SchemaTypes.ObjectId],
    followings: [SchemaTypes.ObjectId],
    posts: [SchemaTypes.ObjectId],
    isActive: { type: Boolean, Default: true },
    createdAt: { type: Date , Default: Date.now },
    updatedAt: { type: Date, Default: Date.now }
});

userSchema.methods.follow = function(userId) {
  let type;
  if(this.followings.indexOf(userId) === -1) {
    this.followings.push(userId);
    type = 'follow';
  } else {
    this.followings.pull(userId);
    type = 'unfollow';
  }
  this.save();
  return {type: type};
};

userSchema.methods.addFollower = function(userId) {
  if(this.followers.indexOf(userId) === -1) {
    this.followers.push(userId);
    type = 'follow';
  } else {
    this.followers.pull(userId);
    type = 'unfollow';
  }
  this.save();
  return {type: type};
}


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
