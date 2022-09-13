import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import quizReducer from './quizReducer'
import adminReducer from './adminReducer'

const reducer = combineReducers({
  quizReducer,
  adminReducer,
})

const store = configureStore({ reducer })
export default store
