const mongoose = require('mongoose')

let APP_CONSTANTS = require('../config/appDefaults')
let RESPONSE_MESSAGES = require('../config/responseMessages')
let { queries } = require('../db')
let Schema = require('../schemas')

const questions = {
  /**
   * Add question into storage for the quiz
   *
   * @param {*} questionDetails
   * @param {*} userDetails
   * @returns
   */
  addNewQuestion: async (questionDetails, userDetails) => {
    try {
      let questionDetailQuery = {
        $and: [
          { quizId: mongoose.Types.ObjectId(questionDetails.quizId) },
          { status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE },
        ],
      }
      let questionCount = await queries.countDocuments(
        Schema.question,
        questionDetailQuery
      )

      // Check the question counts
      // It only allows to add new question,
      // if question counts are less then 10 in the storage
      if (questionCount >= 10) {
        return {
          response: RESPONSE_MESSAGES.QUESTION.CREATE.TOTAL_LIMIT,
          finalData: {},
        }
      }

      options = JSON.parse(questionDetails.optionsList)
      let optionList = []
      let answerList = []

      // Filter the option list and answer list
      for (let [key, obj] of Object.entries(options)) {
        if (obj.answer) answerList.push(key)
        optionList.push({ key: key, value: obj.value })
      }

      let questionObject = {
        quizId: questionDetails.quizId,
        question: questionDetails.question,
        description: questionDetails.description
          ? questionDetails.description
          : null,
        optionType: questionDetails.optionType,
        userId: userDetails._id,
        correctAnswer: answerList,
        options: optionList,
        status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
      }

      await queries.create(Schema.question, questionObject)

      return {
        response: RESPONSE_MESSAGES.QUESTION.CREATE.SUCCESS,
        finalData: {},
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Get the questions of the quiz from the storage
   *
   * @param {*} params
   * @returns
   */
  getQuizQuestions: async (params) => {
    try {
      let query = {
        $and: [
          { quizId: mongoose.Types.ObjectId(params.quizId) },
          { status: { $nin: [APP_CONSTANTS.QUESTION_STATUS.DELETED] } },
        ],
      }
      let projections = {
        createdDate: 0,
        modifiedDate: 0,
        quizId: 0,
        userId: 0,
      }
      let options = { lean: true }

      // Get the questions
      let questions = await queries.getData(
        Schema.question,
        query,
        projections,
        options
      )

      // Get the question counts of the quiz
      let countDocuments = await queries.countDocuments(Schema.question, query)

      query = { _id: mongoose.Types.ObjectId(params.quizId) }
      projections = { title: 1, status: 1 }

      // Get the quiz details
      let quizDetails = await queries.findOne(
        Schema.quiz,
        query,
        projections,
        options
      )

      return {
        response: { STATUS_CODE: 200, MSG: '' },
        finalData: { questions, quizDetails, count: countDocuments },
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Get particular question details from the storage
   *
   * @param {*} payload
   * @returns
   */
  getParticularQuestion: async (payload) => {
    try {
      let query = { _id: mongoose.Types.ObjectId(payload.questionId) }
      let projections = { modifiedAt: 0, createdAt: 0, __v: 0 }
      let options = {}

      // Get the question details
      let questionDetails = await queries.findOne(
        Schema.question,
        query,
        projections,
        options
      )

      return {
        response: { STATUS_CODE: 200, MSG: '' },
        finalData: { questionDetails },
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Update particular question into the storage
   *
   * @param {*} params
   * @param {*} payload
   * @returns
   */
  update: async (params, payload) => {
    try {
      let optionList = []
      let answerList = []

      options = JSON.parse(payload.optionsList)

      for (let [key, obj] of Object.entries(options)) {
        if (obj.answer) answerList.push(key)
        optionList.push({ key: key, value: obj.value })
      }
      conditions = { _id: mongoose.Types.ObjectId(params.questionId) }

      let toUpdate = {
        question: payload.question,
        description: payload.description,
        optionType: payload.optionType,
        options: optionList,
        correctAnswer: answerList,
        updatedDate: new Date(),
      }

      // Update question details
      let updatedQuestion = await queries.findAndUpdate(
        Schema.question,
        conditions,
        toUpdate
      )

      if (updatedQuestion) {
        return {
          response: RESPONSE_MESSAGES.QUESTION.UPDATE.SUCCESS,
          finalData: {},
        }
      } else {
        return {
          response: RESPONSE_MESSAGES.QUESTION.UPDATE.INVALID_QUESTION_ID,
          finalData: {},
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Delete the question of the quiz from the storage
   * It does not delete permanently, it just change the status to DELETED
   *
   * @param {*} params
   * @returns
   */
  delete: async (params) => {
    try {
      let condition = { _id: mongoose.Types.ObjectId(params.questionId) }
      let toUpdate = {
        $set: { status: APP_CONSTANTS.QUESTION_STATUS.DELETED },
      }
      let options = { lean: true, new: true }

      let questionDetail = await queries.findAndUpdate(
        Schema.question,
        condition,
        toUpdate,
        options
      )

      if (questionDetail) {
        return {
          status: RESPONSE_MESSAGES.QUESTION.DELETE.SUCCESS.STATUS_CODE,
          data: {
            msg: RESPONSE_MESSAGES.QUESTION.DELETE.SUCCESS.MSG,
            question: { _id: questionDetail._id },
          },
        }
      } else {
        return {
          status: RESPONSE_MESSAGES.QUESTION.DELETE.INVALID_ID.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.QUESTION.DELETE.INVALID_ID.MSG },
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Update question status into the storage
   *
   * @param {*} params
   * @param {*} data
   * @returns
   */
  updateQuestionStatus: async (params, data) => {
    try {
      let condition = { _id: mongoose.Types.ObjectId(params.questionId) }
      let toUpdate
      let options = { lean: true, new: true }

      if (data.status === APP_CONSTANTS.QUESTION_STATUS.ACTIVE) {
        toUpdate = {
          $set: {
            status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
            modifiedDate: new Date(),
          },
        }
      } else {
        toUpdate = {
          $set: {
            status: APP_CONSTANTS.QUESTION_STATUS.INACTIVE,
            modifiedDate: new Date(),
          },
        }
      }

      let questionDetail = await queries.findAndUpdate(
        Schema.question,
        condition,
        toUpdate,
        options
      )

      if (questionDetail) {
        return {
          response: RESPONSE_MESSAGES.QUESTION.UPDATE.STATUS[data.status],
          finalData: {},
        }
      } else {
        return {
          response: RESPONSE_MESSAGES.QUESTION.UPDATE.STATUS.INVALID_ID,
          finalData: {},
        }
      }
    } catch (err) {
      throw err
    }
  },
}

module.exports = questions
