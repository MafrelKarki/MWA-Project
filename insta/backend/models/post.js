const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  comments: [{comment_id: {type: mongoose.Schema.Types.ObjectId}, comment: {type: String}}]
});

module.exports = mongoose.model('Post', postSchema);
