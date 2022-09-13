const express = require('express')

const { quizController, questionController } = require('../controllers')
const { authMiddleware, requestMiddleware } = require('../middleware')
const { QuizValidator } = require('../validator')

module.exports = () => {
  const router = express.Router()

  router.get(
    '/dashboard',
    authMiddleware,
    quizController.getDashboardCardDetails
  )

  router.post(
    '/quiz',
    authMiddleware,
    requestMiddleware(QuizValidator.SAVE_QUIZ),
    quizController.saveQuizDetails
  )

  router.get(
    '/quiz',
    authMiddleware,
    requestMiddleware(QuizValidator.GET_QUIZ),
    quizController.getQuizDetails
  )

  router.get(
    '/quiz/:quizId/questionDetails',
    authMiddleware,
    requestMiddleware(QuizValidator.GET_QUIZ_DETAILS),
    quizController.getSpecificQuizQuestionDetails
  )

  router.get(
    '/quiz/quizDetails',
    authMiddleware,
    requestMiddleware(QuizValidator.GET_QUIZ_LIST),
    quizController.getQuizList
  )

  router.get(
    '/quiz/:quizId',
    authMiddleware,
    requestMiddleware(QuizValidator.GET_QUIZ_DETAILS),
    quizController.getParticularQuiz
  )

  router.patch(
    '/quiz/:quizId',
    authMiddleware,
    requestMiddleware(QuizValidator.UPDATE_QUIZ),
    quizController.updateQuizDetails
  )

  router.delete(
    '/quiz',
    authMiddleware,
    requestMiddleware(QuizValidator.DELETE_QUIZ),
    quizController.deleteQuiz
  )

  router.post(
    '/quiz/publish',
    authMiddleware,
    requestMiddleware(QuizValidator.PUBLISH_QUIZ),
    quizController.publishQuiz
  )

  router.post('/question', authMiddleware, questionController.addNewQuestion)

  router.get(
    '/quiz/:quizId/questions',
    authMiddleware,
    requestMiddleware(QuizValidator.GET_QUIZ_QUESTIONS),
    questionController.getAllQuestions
  )

  router.get(
    '/question/:questionId',
    authMiddleware,
    requestMiddleware(QuizValidator.PARTICULAR_QUESTION),
    questionController.getParticularQuestion
  )

  router.patch(
    '/question/:questionId/status',
    authMiddleware,
    requestMiddleware(QuizValidator.QUESTION_STATUS),
    questionController.updateQuestionStatus
  )

  router.patch(
    '/question/:questionId',
    authMiddleware,
    requestMiddleware(QuizValidator.UPDATE_QUESTION),
    questionController.update
  )

  router.delete(
    '/question/:questionId',
    authMiddleware,
    requestMiddleware(QuizValidator.DELETE_QUESTION),
    questionController.delete
  )

  return router
}
