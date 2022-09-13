const passport = require('passport')

const auth = require('../auth')
const { factories } = require('../factories')
const RESPONSE_MESSAGES = require('../config/responseMessages')
const { queries } = require('../db')
const Schema = require('../schemas')

const user = {
  /**
   * Save user details into the storage
   *
   * @param {*} userData
   * @returns
   */
  saveUserDetails: async (userData) => {
    try {
      let query = {
        email: userData.email,
      }
      let options = { lean: true }

      let existingUser = await queries.findOne(Schema.users, query, options)

      if (!existingUser) {
        userData.password = factories.generateHashedPassword(userData.password)

        await queries.create(Schema.users, userData)
        return {
          status: RESPONSE_MESSAGES.SIGNUP.SUCCESS.STATUS_CODE,
          data: { msg: RESPONSE_MESSAGES.SIGNUP.SUCCESS.MSG },
        }
      } else {
        return {
          status: RESPONSE_MESSAGES.SIGNUP.DUPLICATE_RESOURCE.STATUS_CODE,
          data: {
            msg: RESPONSE_MESSAGES.SIGNUP.DUPLICATE_RESOURCE.MSG,
          },
        }
      }
    } catch (err) {
      throw err
    }
  },

  /**
   * Check & verify the credential from the storage
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  loginUser: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)

      if (!user) return res.status(info.STATUS_CODE).json({ msg: info.MSG })

      req.logIn(user, (err) => {
        let token = auth.token.create(user)
        res.status(200).send({
          token: token,
          lastLogin: user.lastLogin,
        })
      })
    })(req, res, next)
  },
}

module.exports = user
