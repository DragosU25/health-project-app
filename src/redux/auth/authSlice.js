// src/redux/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  verifyUserEmail,
  resendVerificationEmail,
  logoutUser,
  getCurrentUser,
} from "./authOperations";

const initialState = {
  user: {
    _id: null,
    email: null,
    username: null,
    height: null,
    calories: null,
    age: null,
    bloodType: null,
  },
  token: null,
  verificationToken: null,
  isAuthenticated: false,
  isVerified: false, // Adăugăm această proprietate
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.verificationToken = action.payload.user.verificationToken;
        state.isAuthenticated = false;

        console.log(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        if (action.payload.user.isVerified) {
          state.isAuthenticated = true;
          state.isVerified = true;
        } else {
          state.isAuthenticated = false;
          state.isVerified = false;
          state.error =
            "Email-ul nu este verificat. Te rugăm să verifici email-ul."; // Mesaj personalizat
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyUserEmail.pending, (state, action) => {
        state.isVerified = action.payload.user.verify; // Setăm valoarea din răspuns
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUserEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;

        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
