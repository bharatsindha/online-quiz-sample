const bcrypt = require('bcryptjs')

let factories = {
  /**
   * Generate the hashed password
   *
   * @param {*} password
   * @returns
   */
  generateHashedPassword: (password) => {
    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
  },

  /**
   * Compare typed pasword with actual password
   *
   * @param {*} typedPassword
   * @param {*} actualPassword
   * @returns
   */
  compareHashedPassword: (typedPassword, actualPassword) => {
    let comparedPasswordStatus = bcrypt.compareSync(
      typedPassword,
      actualPassword
    )
    return comparedPasswordStatus
  },

  /**
   * Return randomly generated sequence of
   * six alphanumeric characters
   *
   * @returns
   */
  generateAlphanumericRandomCode: () => {
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var result = ''

    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result
  },
}

module.exports = factories
