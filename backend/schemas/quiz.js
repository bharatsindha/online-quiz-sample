const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose

const quiz = new Schema({
  title: { type: String, required: true, index: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  randomCode: { type: String, index: true },
  createdDate: { type: Number, default: Date.now },
  modifiedDate: { type: Number, default: Date.now },
  status: { type: String, required: true },
})

module.exports = mongoose.model('quiz', quiz)
