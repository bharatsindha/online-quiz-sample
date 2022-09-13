const express = require('express')

const { userController } = require('../controllers')
const { UserValidator } = require('../validator')
const { requestMiddleware } = require('../middleware')

module.exports = () => {
  const router = express.Router()

  router.post(
    '/signup',
    requestMiddleware(UserValidator.SIGNUP_USER),
    userController.saveUserDetails
  )

  router.post(
    '/login',
    requestMiddleware(UserValidator.LOGIN_USER),
    userController.loginUser
  )

  return router
}
