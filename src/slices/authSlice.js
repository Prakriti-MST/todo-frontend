import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    unsetUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      const err = action.payload?.response?.data;

      // If backend returned fieldErrors, store that as error
      if (err?.data?.fieldErrors) {
        state.error = err.data.fieldErrors;
      } else {
        // fallback to general message
        state.error = err?.message || "Something went wrong";
      }
    },
    unsetError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, unsetUser, setError, unsetError, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
