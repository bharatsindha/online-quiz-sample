const jwt = require('jsonwebtoken')

/**
 * Generate the token for the user after successfully logged in
 *
 * @param {*} userData
 * @returns
 */
const create = (userData) => {
  let privateKey = 'gRG9lIiwiaWF0IjoxNTE2MjM5'
  let object = {
    userId: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
  }
  var token = jwt.sign(object, privateKey, { expiresIn: '10h' })
  return token
}

module.exports = {
  create,
}
