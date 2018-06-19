const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  userId: { type: SchemaTypes.ObjectId, required: true},
  userFullName: { type: String},
  comment: { type: String },
  isAnonymous: { type: Boolean },
  createdAt: { type:Date, Default:Date.now },
  updatedAt: { type:Date, Default:Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
