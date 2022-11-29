const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema(
    {
      email: String,
      password: String,
      fullName: String
    }
  );

const User = mongoose.model('User', userSchema);

module.exports = User;