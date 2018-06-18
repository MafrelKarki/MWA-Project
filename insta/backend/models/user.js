const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var SchemaTypes = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
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

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
