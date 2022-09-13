const mongoose = require('mongoose')

const Schema = mongoose.Schema

const users = new Schema({
  firstName: { type: String, required: true, lowercase: true, index: true },
  lastName: { type: String, required: true, lowercase: true, index: true },
  email: { type: String, required: true },
  password: { type: String, default: null },
  lastLogin: { type: Number, default: null },
  createdDate: { type: Number, default: Date.now },
  modifiedDate: { type: Number, default: Date.now },
})

module.exports = mongoose.model('users', users)
