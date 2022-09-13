module.exports = {
  INCORRECT_CREDENTIALS: {
    STATUS_CODE: 403,
    MSG: 'Incorrect credentials',
  },
  SIGNUP: {
    SUCCESS: {
      STATUS_CODE: 200,
      MSG: 'Your account has been created successfully.',
    },
    DUPLICATE_RESOURCE: {
      STATUS_CODE: 409,
      MSG: 'User already existed',
    },
  },
  DB_ERROR: {
    STATUS_CODE: 500,
    MSG: 'Some error is caused in db',
  },
  QUIZ: {
    CREATE: {
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'New quiz created successfully',
      },
    },
    DELETE: {
      INVALID_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid quiz id',
      },
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Quiz has been deleted',
      },
    },
    PUBLISH: {
      INVALID_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid quiz id',
      },
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Quiz has been published',
      },
      NOT_QUESTION_FOUND: {
        STATUS_CODE: 400,
        MSG: 'You required at least one question to publish the quiz.',
      },
    },
    UPDATE: {
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Quiz updated successfully',
      },
      INVALID_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid quiz id',
      },
      INVALID_PASSWORD: {
        STATUS_CODE: 401,
        MSG: 'Incorrect current password',
      },
    },
    QUIZ_PASSWORD: {
      INVALID_QUIZ_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid quiz id',
      },
      INVALID_PASSWORD: {
        STATUS_CODE: 400,
        MSG: 'Wrong quiz credentials',
      },
      SUBMITTED_QUIZ: {
        STATUS_CODE: 400,
        MSG: 'You cannot give quiz more than once',
      },
    },
    QUIZ_QUESTION: {
      INVALID_QUIZ_ID: {
        STATUS_CODE: 200,
        MSG: 'Invalid quiz Id',
      },
      QUESTION_NOT_FOUND: {
        STATUS_CODE: 200,
        MSG: 'Questions are not found for the quiz.',
      },
      NOT_PUBLISH: {
        STATUS_CODE: 200,
        MSG: 'Quiz not yet publish, you are not allowed to give this quiz.',
      },
      DELETED: {
        STATUS_CODE: 200,
        MSG: 'Quiz is already deleted by author, you can not attempt now.',
      },
      BLOCKED_QUIZ: {
        STATUS_CODE: 200,
        MSG: 'You are not allowed to give this quiz',
      },
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Answer saved successfully',
      },
      SUBMITTED: {
        STATUS_CODE: 200,
        MSG: 'Quiz have been submitted successfully',
      },
      INVALID_QUESTION_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid question Id',
      },
    },
  },
  QUESTION: {
    CREATE: {
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Question is added to quiz successfully',
      },
      TOTAL_LIMIT: {
        STATUS_CODE: 400,
        MSG: 'You have exceeded question limit. It must be of 1-10 questions.',
      },
    },
    DELETE: {
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Question is deleted from quiz successfully',
      },
      INVALID_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid question id',
      },
    },
    UPDATE: {
      STATUS: {
        ACTIVE: {
          STATUS_CODE: 200,
          MSG: 'Question has been set to active',
        },
        INACTIVE: {
          STATUS_CODE: 200,
          MSG: 'Question has been set to inactive',
        },
        INVALID_ID: {
          STATUS_CODE: 400,
          MSG: 'Invalid question id',
        },
      },
      SUCCESS: {
        STATUS_CODE: 200,
        MSG: 'Question updated successfully',
      },
      INVALID_QUIZ_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid quiz Id',
      },
      INVALID_QUESTION_ID: {
        STATUS_CODE: 400,
        MSG: 'Invalid question id',
      },
    },
  },
  USER: {
    INVALID_USER_ID: {
      STATUS_CODE: 400,
      MSG: 'Invalid user id',
    },
  },
}
