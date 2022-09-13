const { quizHandler } = require('../handlers')
const responseManager = require('../lib/responseManager')

const quiz = {
  /**
   * get dashboard card details
   *
   * @param {*} req
   * @param {*} res
   */
  getDashboardCardDetails: async (req, res) => {
    try {
      let userDetails = req.user

      let responseData = await quizHandler.getDashboardCardDetails(userDetails)

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Save quiz details
   *
   * @param {*} req
   * @param {*} res
   */
  saveQuizDetails: async (req, res) => {
    try {
      let quizDetails = req.body
      let userData = req.user

      let response = await quizHandler.saveQuizDetails(quizDetails, userData)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Get quiz details
   *
   * @param {*} req
   * @param {*} res
   */
  getQuizDetails: async (req, res) => {
    try {
      let query = req.query
      let userDetails = req.user
      let responseData = await quizHandler.getAllQuizs(query, userDetails)

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Update quiz details
   *
   * @param {*} req
   * @param {*} res
   */
  updateQuizDetails: async (req, res) => {
    try {
      let quizDetails = req.body
      quizDetails.quizId = req.params.quizId
      let responseData = await quizHandler.updateQuiz(quizDetails)

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Delete quiz
   *
   * @param {*} req
   * @param {*} res
   */
  deleteQuiz: async (req, res) => {
    try {
      let quizDetails = req.query

      let response = await quizHandler.deleteQuiz(quizDetails)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Publish quiz
   *
   * @param {*} req
   * @param {*} res
   */
  publishQuiz: async (req, res) => {
    try {
      let quizDetails = req.query

      let response = await quizHandler.publishQuiz(quizDetails)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Get particular quiz details
   *
   * @param {*} req
   * @param {*} res
   */
  getParticularQuiz: async (req, res) => {
    try {
      let params = req.params
      let userDetails = req.user
      let response = await quizHandler.getParticularQuiz(params, userDetails)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Get specific quiz question details
   *
   * @param {*} req
   * @param {*} res
   */
  getSpecificQuizQuestionDetails: async (req, res) => {
    try {
      let params = req.params
      let responseData = await quizHandler.getSpecificQuizQuestionDetails(
        params
      )

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Get the list of the quiz for the user
   *
   * @param {*} req
   * @param {*} res
   */
  getQuizList: async (req, res) => {
    try {
      let userDetails = req.user
      let payload = req.query

      let response = await quizHandler.getQuizList(payload, userDetails)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Get particular question of the quiz
   *
   * @param {*} req
   * @param {*} res
   */
  getParticularQuizQuestion: async (req, res) => {
    try {
      let payload = { ...req.query, ...req.params }

      let responseData = await quizHandler.getQuizQuestions(payload)

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Submit the quiz test,
   * calculate the total attempted, correct answered, wrong answered
   *
   * @param {*} req
   * @param {*} res
   */
  submitQuiz: async (req, res) => {
    try {
      let payload = { ...req.query, ...req.params, ...req.body }

      let responseData = await quizHandler.submitQuiz(payload)
      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },
}

module.exports = quiz
