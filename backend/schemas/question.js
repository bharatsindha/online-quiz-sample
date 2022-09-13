const mongoose = require('mongoose')

const Schema = mongoose.Schema

const APP_CONSTANTS = require('../config/appDefaults')

const questionStatusEnum = [
  APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
  APP_CONSTANTS.QUESTION_STATUS.DELETED,
  APP_CONSTANTS.QUESTION_STATUS.INACTIVE,
]

const questions = new Schema({
  quizId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  question: { type: String, required: true },
  description: { type: String },
  optionType: { type: String, required: true },
  correctAnswer: [{ type: String, required: true }],
  options: [{ key: String, value: String }],
  createdDate: { type: Number, default: Date.now },
  modifiedDate: { type: Number, default: Date.now },
  status: { type: String, required: true, enum: questionStatusEnum },
})

module.exports = mongoose.model('questions', questions)
