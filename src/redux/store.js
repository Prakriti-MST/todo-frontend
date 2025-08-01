import { configureStore } from '@reduxjs/toolkit'
import authReducer from './../slices/authSlice'
import todosReducer from './../slices/todoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
})
