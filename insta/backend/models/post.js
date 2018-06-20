/*
* @Author: Mafrel
*
*/
const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String},
  imagePath: {type: String},
  userId: {type:SchemaTypes.ObjectId},
  points: {type: Number, Default: 0},
  comments: [SchemaTypes.ObjectId],
  likes: [SchemaTypes.ObjectId],
  createdAt: {type:Date, Default:Date.now},
  updatedAt: {type:Date, Default:Date.now}
});

postSchema.methods.like = function(userId) {
  if(this.likes.find(user => user._id == userId)) {
      this.likes.pull(userId);
  } else {
    this.likes.push(userId);
  }
  return this.save();
};

module.exports = mongoose.model('Post', postSchema);
