const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
    match: [/^[a-zA-Z]+$/, 'First name must contain only alphabetical characters']
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
    match: [/^[a-zA-Z]+$/, 'Last name must contain only alphabetical characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User; 