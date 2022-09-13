const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const moment = require('moment')

const { factories } = require('../factories')
const RESPONSE_MESSAGES = require('../config/responseMessages')
const { queries } = require('../db')
const Schema = require('../schemas')

/**
 * Compare the typed password with the user's password
 *
 * @param {*} typedPassword
 * @param {*} user
 * @param {*} done
 * @returns
 */
let comparePassword = async (typedPassword, user, done) => {
  let userStatus = factories.compareHashedPassword(typedPassword, user.password)
  if (userStatus) {
    let condition = { _id: mongoose.Types.ObjectId(user._id) }
    let toUpdate = { lastLogin: moment().valueOf() }
    let options = {}

    await queries.findAndUpdate(Schema.users, condition, toUpdate, options)
    return done(null, user)
  } else
    return done(null, false, {
      ...RESPONSE_MESSAGES.INCORRECT_CREDENTIALS,
    })
}

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        let query = { email: email }
        let projections = {
          password: 1,
          firstName: 1,
          lastName: 1,
        }
        let options = { lean: true }

        let user = await queries.findOne(
          Schema.users,
          query,
          projections,
          options
        )

        if (user) {
          return comparePassword(password, user, done)
        } else {
          return done(null, false, {
            ...RESPONSE_MESSAGES.INCORRECT_CREDENTIALS,
          })
        }
      } catch (err) {
        throw err
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, cb) => {
        let query = { _id: mongoose.Types.ObjectId(jwtPayload.userId) }
        let projections = {}
        let options = { lean: true }

        let user = await queries.findOne(
          Schema.users,
          query,
          projections,
          options
        )

        return cb(null, user)
      }
    )
  )
}
