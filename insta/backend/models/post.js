const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;


const postSchema = mongoose.Schema({
  // content: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: {type: String},
  userId: {type:SchemaTypes.ObjectId},
  points: {type: Number, Default: 0},
  comments: [SchemaTypes.ObjectId],
  likes: [SchemaTypes.ObjectId],
  createdAt: {type:Date, Default:Date.now},
  updatedAt: {type:Date, Default:Date.now}
});

module.exports = mongoose.model('Post', postSchema);
