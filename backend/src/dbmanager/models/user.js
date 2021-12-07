const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  front: { type: String, minlength: 1, maxlength: 1, match: /[a-z0-9]/i },
  color: { type: String, match: /^#[A-F\d]{6}/i },
  colors: { type: [{ type: String, required: true, match: /^#[A-F\d]{6}/i }], maxlength: 3, minlength: 1, required: true },
});

const userShema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true, unique: true },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+/, unique: true },
  password: { type: String, required: true },
  avatar: avatarSchema,
  observed: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }
});

module.exports = mongoose.model('User', userShema);