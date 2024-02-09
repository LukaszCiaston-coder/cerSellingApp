// reducers.js
import { createSlice } from "@reduxjs/toolkit";
import {
  signUpUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  uploadAvatar,
  sendVerificationEmail,
  verifyEmail,
} from "./userActions";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        // Handle avatar upload success
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.error = action.payload.message;
        // Handle avatar upload failure
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        // Handle verification email send success
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.error = action.payload.message;
        // Handle verification email send failure
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        // Handle email verification success
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload.message;
        // Handle email verification failure
      });
  },
});

export const authReducer = authSlice.reducer;
