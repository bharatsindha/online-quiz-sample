import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'quizReducer',
  initialState: {
    quizDetails: {},
    answers: [],
  },
  reducers: {
    setQuizDetails: (state, action) => {
      state.quizDetails = action.payload
    },
    setAnswer: (state, action) => {
      const checkAnswerExist = state.answers.filter(
        (a1) => a1.questionId === action.payload.questionId
      )
      if (checkAnswerExist.length) {
        state.answers = state.answers.map((a1) => {
          if (a1.questionId === action.payload.questionId) {
            a1 = {
              ...a1,
              answer: action.payload.answer,
              optionType: action.payload.optionType,
            }
          }

          return a1
        })
      } else state.answers = [...state.answers, action.payload]
    },
  },
})
export default slice.reducer

// Actions
export const { setQuizDetails, setAnswer } = slice.actions
