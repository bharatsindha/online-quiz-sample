const express = require('express')

const { quizController } = require('../controllers')
const { requestMiddleware } = require('../middleware')
const { QuizValidator } = require('../validator')

module.exports = () => {
  const router = express.Router()

  router.get(
    '/quiz/:quizCode/question',
    requestMiddleware(QuizValidator.PARTICULAR_QUIZ_QUESTION),
    quizController.getParticularQuizQuestion
  )

  router.post(
    '/quiz/:quizCode/submit',
    requestMiddleware(QuizValidator.QUIZ_SUBMIT),
    quizController.submitQuiz
  )

  return router
}
