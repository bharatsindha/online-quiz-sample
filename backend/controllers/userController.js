const { userHandler } = require('../handlers')

const user = {
  /**
   * Save user details
   *
   * @param {*} req
   * @param {*} res
   */
  saveUserDetails: async (req, res) => {
    try {
      let userData = req.body
      let response = await userHandler.saveUserDetails(userData)
      res.status(response.status).send(response.data)
    } catch (err) {
      throw err
    }
  },

  /**
   * Check login user
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  loginUser: async (req, res, next) => {
    let response = await userHandler.loginUser(req, res, next)
    return response
  },
}

module.exports = user
