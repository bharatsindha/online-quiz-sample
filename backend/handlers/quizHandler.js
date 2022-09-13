const mongoose = require('mongoose')
let APP_CONSTANTS = require('../config/appDefaults')
let RESPONSE_MESSAGES = require('../config/responseMessages')
const queries = require('../db/queries')
const factories = require('../factories/factories')
let Schema = require('../schemas')

const quizs = {
  /**
   * Get dashboard card details
   *
   * @returns
   */
  getDashboardCardDetails: async (userDetails) => {
    try {
      let query = {
        $and: [
          { userId: userDetails._id },
          { status: { $nin: [APP_CONSTANTS.QUIZ_STATUS.DELETED] } },
        ],
      }

      let quizCount = await queries.countDocuments(Schema.quiz, query)

      return {
        response: { STATUS_CODE: 200, MSG: '' },
        finalData: { quizCount },
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Save quiz details into the storage
   *
   * @param {*} quizDetails
   * @param {*} userData
   * @returns
   */
  saveQuizDetails: async (quizDetails, userData) => {
    try {
      let saveData = {
        title: quizDetails.title,
        userId: userData._id,
        status: APP_CONSTANTS.QUIZ_STATUS.CREATED,
      }

      await queries.create(Schema.quiz, saveData)

      return {
        data: { msg: RESPONSE_MESSAGES.QUIZ.CREATE.SUCCESS.MSG },
        status: RESPONSE_MESSAGES.QUIZ.CREATE.SUCCESS.STATUS_CODE,
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Get the list of the quizzes from the storage for the loggen in user
   *
   * @param {*} payload
   * @param {*} userData
   * @returns
   */
  getAllQuizs: async (payload, userData) => {
    try {
      let query = {
        $and: [{ userId: userData._id }],
      }

      // Title filter
      if (payload.title) {
        query.$and.push({
          $or: [{ title: { $regex: RegExp(payload.title, 'i') } }],
        })
      }

      // Status filter
      if (payload.status) {
        query.$and.push({
          status: { $in: [payload.status] },
        })
      } else {
        query.$and.push({
          status: { $nin: [APP_CONSTANTS.QUIZ_STATUS.DELETED] },
        })
      }

      let projections = { modifiedDate: 0 }

      let pageSize = parseInt(payload.pageSize, 10)
      let pageIndex = parseInt(payload.pageIndex) * pageSize
      let options = {
        lean: true,
        skip: pageIndex,
        limit: pageSize,
        sort: { createdDate: 'descending' },
      }

      // Get the quizzes
      let quizDetails = await queries.getData(
        Schema.quiz,
        query,
        projections,
        options
      )

      let quizCount = await queries.countDocuments(Schema.quiz, query)

      return {
        response: { STATUS_CODE: 200, MSG: '' },
        finalData: { quizList: quizDetails, quizCount },
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Get the particular quiz details from the storage
   *
   * @param {*} payload
   * @param {*} userDetails
   * @returns
   */
  getParticularQuiz: async (payload, userDetails) => {
    try {
      let query = {
        _id: payload.quizId,
      }
      let projections = {}
      let options = { lean: true }

      let quizDetails = await queries.getData(
        Schema.quiz,
        query,
        projections,
        options
      )

      return {
        status: 200,
        data: { quizDetails: quizDetails[0] },
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Update quiz details into the storage
   *
   * @param {*} payload
   * @returns
   */
  updateQuiz: async (payload) => {
    try {
      let conditions = { _id: payload.quizId }

      let toUpdate = {}

      let options = {
        new: true,
        fields: {},
      }

      if (payload.title) toUpdate.title = payload.title

      // Update quiz details
      let updatedQuiz = await queries.findAndUpdate(
        Schema.quiz,
        conditions,
        toUpdate,
        options
      )

      if (updatedQuiz) {
        return {
          response: RESPONSE_MESSAGES.QUIZ.UPDATE.SUCCESS,
          finalData: { quizDetails: updatedQuiz },
        }
      } else {
        return {
          response: RESPONSE_MESSAGES.QUIZ.UPDATE.INVALID_ID,
          finalData: {},
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Delete the quiz from the storage
   *
   * @param {*} quizDetails
   * @returns
   */
  deleteQuiz: async (quizDetails) => {
    try {
      let conditions = { _id: quizDetails.quizId }
      let toUpdate = { status: APP_CONSTANTS.QUIZ_STATUS.DELETED }
      let options = { new: true }

      let updatedQuiz = await queries.findAndUpdate(
        Schema.quiz,
        conditions,
        toUpdate,
        options
      )

      if (updatedQuiz) {
        return {
          status: RESPONSE_MESSAGES.QUIZ.DELETE.SUCCESS.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.QUIZ.DELETE.SUCCESS.MSG },
        }
      } else {
        return {
          status: RESPONSE_MESSAGES.QUIZ.DELETE.INVALID_ID.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.QUIZ.DELETE.INVALID_ID.MSG },
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Publish quiz online, It just update status to 'ACTIVE',
   * A published quiz generates a permalink that is a randomly
   * generated sequence of 6 alphanumeric characters.
   *
   * @param {*} quizDetails
   * @returns
   */
  publishQuiz: async (quizDetails) => {
    try {
      let questionDetailQuery = {
        $and: [
          { quizId: mongoose.Types.ObjectId(quizDetails.quizId) },
          { status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE },
        ],
      }
      let questionCount = await queries.countDocuments(
        Schema.question,
        questionDetailQuery
      )

      if (questionCount == 0) {
        return {
          status: RESPONSE_MESSAGES.QUIZ.PUBLISH.NOT_QUESTION_FOUND.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.QUIZ.PUBLISH.NOT_QUESTION_FOUND.MSG },
        }
      }

      let conditions = { _id: quizDetails.quizId }
      let toUpdate = {
        status: APP_CONSTANTS.QUIZ_STATUS.ACTIVE,
        randomCode: factories.generateAlphanumericRandomCode(),
      }
      let options = { new: true }

      // Update quiz details
      let updatedQuiz = await queries.findAndUpdate(
        Schema.quiz,
        conditions,
        toUpdate,
        options
      )

      if (updatedQuiz) {
        return {
          status: RESPONSE_MESSAGES.QUIZ.PUBLISH.SUCCESS.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.QUIZ.PUBLISH.SUCCESS.MSG },
        }
      } else {
        return {
          status: RESPONSE_MESSAGES.QUIZ.PUBLISH.INVALID_ID.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.QUIZ.PUBLISH.INVALID_ID.MSG },
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Get specific question details of the quiz
   *
   * @param {*} payload
   * @returns
   */
  getSpecificQuizQuestionDetails: async (payload) => {
    try {
      let query = { _id: payload.quizId }
      let projections = {}
      let options = { lean: true }

      let quizDetails = await queries.findOne(
        Schema.quiz,
        query,
        projections,
        options
      )

      return {
        response: { STATUS_CODE: 200, MSG: '' },
        finalData: { quizDetails },
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Get the quiz question from the storage
   *
   * @param {*} payload
   * @returns
   */
  getQuizQuestions: async (payload) => {
    try {
      let pageIndex = parseInt(payload.pageIndex, 10)

      let quizDetailQuery = {
        $and: [{ randomCode: payload.quizCode }],
      }

      let projections = {}

      // Get the quiz details
      let quizDetails = await queries.findOne(
        Schema.quiz,
        quizDetailQuery,
        projections,
        { lean: true }
      )

      // If the quiz exist and having status with 'ACTIVE'
      if (quizDetails) {
        if (quizDetails.status !== APP_CONSTANTS.QUIZ_STATUS.ACTIVE) {
          return {
            response:
              quizDetails.status === APP_CONSTANTS.QUIZ_STATUS.DELETED
                ? RESPONSE_MESSAGES.QUIZ.QUIZ_QUESTION.DELETED
                : RESPONSE_MESSAGES.QUIZ.QUIZ_QUESTION.NOT_PUBLISH,
            finalData: {},
          }
        }

        let questionDetailQuery = {
          $and: [
            { quizId: quizDetails._id },
            { status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE },
          ],
        }

        if (payload.questionId) {
          questionDetailQuery.$and.push({
            _id: mongoose.Types.ObjectId(payload.questionId),
          })
          pageIndex = 0
        }

        let projections = {
          correctAnswer: 0,
          quizId: 0,
          userId: 0,
          createdDate: 0,
          modifiedDate: 0,
        }

        // Get the question details
        let questionDetails = await queries.findOne(
          Schema.question,
          questionDetailQuery,
          projections,
          { skip: pageIndex, limit: 1, lean: true }
        )

        // If question exist
        if (questionDetails) {
          let questionCount = await queries.countDocuments(
            Schema.question,
            questionDetailQuery
          )

          return {
            response: { STATUS_CODE: 200, MSG: '' },
            finalData: { questionDetails, quizDetails, questionCount },
          }
        } else {
          return {
            response: RESPONSE_MESSAGES.QUIZ.QUIZ_QUESTION.QUESTION_NOT_FOUND,
            finalData: {},
          }
        }
      } else {
        return {
          response: RESPONSE_MESSAGES.QUIZ.QUIZ_QUESTION.INVALID_QUIZ_ID,
          finalData: {},
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Submit the quiz test and,
   * calculate the attempted, correct answered, wrong answered counts
   *
   * @param {*} payload
   * @returns
   */
  submitQuiz: async (payload) => {
    try {
      let totalQuestions = 0,
        totalAttempt = 0,
        totalCorrect = 0

      let quizDetailQuery = {
        $and: [{ randomCode: payload.quizCode }],
      }

      let projections = {}

      // Get the quiz details
      let quizDetails = await queries.findOne(
        Schema.quiz,
        quizDetailQuery,
        projections,
        { lean: true }
      )

      if (quizDetails) {
        let questionDetailQuery = {
          $and: [
            { quizId: quizDetails._id },
            { status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE },
          ],
        }

        let projections = {}

        // Get the questions
        let questions = await queries.getData(
          Schema.question,
          questionDetailQuery,
          projections,
          { lean: true }
        )

        if (questions) {
          totalQuestions = questions.length
          totalAttempt = payload.answers.length

          // Calculate the correct answers for both single and multiple
          payload.answers &&
            payload.answers.forEach((a1) => {
              const questionDetails = questions.filter(
                (q1) => q1._id.toString() === a1.questionId
              )

              if (questionDetails.length) {
                if (
                  questionDetails[0].optionType ===
                  APP_CONSTANTS.OPTION_TYPE.MULTIPLE
                ) {
                  let multiOptAnswer =
                    questionDetails[0].correctAnswer.join(',')

                  let selectedMultiValue = ''
                  Object.keys(a1.answer).forEach((key) => {
                    if (a1.answer[key]) {
                      selectedMultiValue = selectedMultiValue + key + ','
                    }
                  })

                  selectedMultiValue = selectedMultiValue.slice(0, -1)

                  if (multiOptAnswer === selectedMultiValue)
                    totalCorrect = totalCorrect + 1
                } else if (
                  questionDetails[0].optionType ===
                  APP_CONSTANTS.OPTION_TYPE.SINGLE
                ) {
                  if (questionDetails[0].correctAnswer[0] === a1.answer)
                    totalCorrect = totalCorrect + 1
                }
              }
            })
        }
      }
      return {
        response: { STATUS_CODE: 200, MSG: '' },
        finalData: {
          totalQuestions,
          totalAttempt,
          totalCorrect,
          totalWrong: totalAttempt - totalCorrect,
        },
      }
    } catch (err) {
      throw err
    }
  },
}

module.exports = quizs
