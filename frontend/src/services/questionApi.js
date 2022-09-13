import axios from 'axios'

import UserService from './userApi'

class QuestionService {
  constructor() {
    this.userService = new UserService()
    this.QUESTION_URL = 'api/v1/admin/question'
  }

  /**
   * Create question
   *
   * @param {*} formData
   * @returns
   */
  create(formData) {
    let token = this.userService.getToken()
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUESTION_URL}`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Get the list of the questions
   *
   * @param {*} quizId
   * @param {*} query
   * @returns
   */
  getAll(quizId, query) {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/admin/quiz/${quizId}/questions`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Get particular question
   *
   * @param {*} questionId
   * @returns
   */
  getParticular(questionId) {
    let token = this.userService.getToken()
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUESTION_URL}/${questionId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Update the question
   *
   * @param {*} questionId
   * @param {*} questionData
   * @returns
   */
  update(questionId, questionData) {
    let token = this.userService.getToken()
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUESTION_URL}/${questionId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: questionData,
    })
  }

  /**
   * Delete the question
   *
   * @param {*} questionId
   * @returns
   */
  delete(questionId) {
    let token = this.userService.getToken()
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUESTION_URL}/${questionId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Update the question status
   *
   * @param {*} questionId
   * @param {*} data
   * @returns
   */
  updateQuestionStatus(questionId, data) {
    let token = this.userService.getToken()
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_BASE_URL}/${this.QUESTION_URL}/${questionId}/status`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export default QuestionService
