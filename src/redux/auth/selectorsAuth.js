// src/redux/auth/authSelectors.js
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectUserName = (state) => state.auth.user.user;
export const selectUserCurrent = (state) => state.user.user;
