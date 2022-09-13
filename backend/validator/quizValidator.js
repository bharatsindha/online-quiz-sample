const Joi = require('joi')

const APP_CONSTANTS = require('../config/appDefaults')

module.exports = {
  DELETE_QUIZ: {
    query: Joi.object({
      quizId: Joi.string().required().length(24),
    }),
  },

  PUBLISH_QUIZ: {
    query: Joi.object({
      quizId: Joi.string().required().length(24),
    }),
  },

  SAVE_QUIZ: {
    body: Joi.object({
      title: Joi.string().required(),
    }),
  },

  GET_QUIZ: {
    query: Joi.object({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      title: Joi.string().optional(),
      status: Joi.string().valid(
        APP_CONSTANTS.QUIZ_STATUS.ACTIVE,
        APP_CONSTANTS.QUIZ_STATUS.CREATED,
        APP_CONSTANTS.QUIZ_STATUS.DELETED
      ),
    }),
  },

  UPDATE_QUIZ: {
    params: Joi.object({
      quizId: Joi.string().required().length(24),
    }),
    body: Joi.object({
      title: Joi.string().optional(),
    }),
  },

  GET_QUIZ_DETAILS: {
    params: Joi.object({
      quizId: Joi.string().required().length(24),
    }),
  },

  GET_QUIZ_QUESTIONS: {
    params: Joi.object({
      quizId: Joi.string().required().length(24),
    }),
  },

  PARTICULAR_QUESTION: {
    params: Joi.object({
      questionId: Joi.string().required().length(24),
    }),
  },

  DELETE_QUESTION: {
    params: Joi.object({
      questionId: Joi.string().required().length(24),
    }),
  },

  QUIZ_QUESTION_COUNT: {
    query: Joi.object({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
    }),
  },

  QUESTION_STATUS: {
    params: Joi.object({
      questionId: Joi.string().required().length(24),
    }),
    body: Joi.object({
      status: Joi.string()
        .required()
        .valid(
          APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
          APP_CONSTANTS.QUESTION_STATUS.INACTIVE
        ),
    }),
  },

  UPDATE_QUESTION: {
    params: Joi.object({
      questionId: Joi.string().required().length(24),
    }),
    body: Joi.object({
      question: Joi.string().required(),
      quizId: Joi.string().required().length(24),
      description: Joi.string().optional().allow(null),
      optionsList: Joi.string().required(),
      optionType: Joi.string()
        .required()
        .valid(
          APP_CONSTANTS.OPTION_TYPE.SINGLE,
          APP_CONSTANTS.OPTION_TYPE.MULTIPLE
        ),
    }),
  },

  GET_QUIZ_LIST: {
    query: Joi.object({
      studentId: Joi.string().required().length(24),
    }),
  },

  // public APIs
  PARTICULAR_QUIZ_QUESTION: {
    query: Joi.object({
      pageIndex: Joi.number().required(),
    }),
    params: Joi.object({
      quizCode: Joi.string().required(),
      questionId: Joi.string().optional(),
    }),
  },

  QUIZ_SUBMIT: {
    params: Joi.object({
      quizCode: Joi.string().required(),
    }),
  },
}
