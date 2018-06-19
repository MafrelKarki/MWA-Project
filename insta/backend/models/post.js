const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String},
  imagePath: {type: String, required: true},
  userId: {type:SchemaTypes.ObjectId},
  points: {type: Number, Default: 0},
  comments: [SchemaTypes.ObjectId],
  likes: [SchemaTypes.ObjectId],
  createdAt: {type:Date, Default:Date.now},
  updatedAt: {type:Date, Default:Date.now}
});

module.exports = mongoose.model('Post', postSchema);
