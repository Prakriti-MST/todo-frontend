import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const {
  setTodos,
  setLoading
} = todosSlice.actions;
export default todosSlice.reducer;
