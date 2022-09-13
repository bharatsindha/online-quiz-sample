const { questionHandler } = require('../handlers')
const { responseManager } = require('../lib')

const question = {
  /**
   * Add question for the quiz
   *
   * @param {*} req
   * @param {*} res
   */
  addNewQuestion: async (req, res) => {
    try {
      let questionDetails = req.body
      let userDetails = req.user

      let responseData = await questionHandler.addNewQuestion(
        questionDetails,
        userDetails
      )

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Get all the questions for the quiz
   *
   * @param {*} req
   * @param {*} res
   */
  getAllQuestions: async (req, res) => {
    try {
      let params = req.params
      let responseData = await questionHandler.getQuizQuestions(params)

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Get particular question of quiz
   *
   * @param {*} req
   * @param {*} res
   */
  getParticularQuestion: async (req, res) => {
    try {
      let params = req.params

      let responseData = await questionHandler.getParticularQuestion(params)
      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Update question of the quiz
   *
   * @param {*} req
   * @param {*} res
   */
  update: async (req, res) => {
    try {
      let params = req.params
      let questionDetails = req.body

      let responseData = await questionHandler.update(params, questionDetails)
      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },

  /**
   * Delete question of quiz
   *
   * @param {*} req
   * @param {*} res
   */
  delete: async (req, res) => {
    try {
      let params = req.params

      let response = await questionHandler.delete(params)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Update question status of the quiz
   *
   * @param {*} req
   * @param {*} res
   */
  updateQuestionStatus: async (req, res) => {
    try {
      let params = req.params
      let data = req.body
      let responseData = await questionHandler.updateQuestionStatus(
        params,
        data
      )

      responseManager.sendSuccessResponse(responseData, res)
    } catch (err) {
      responseManager.sendErrorResponse(err, res)
    }
  },
}

module.exports = question
