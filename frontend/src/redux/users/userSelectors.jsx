// selectors.js
export const isUserLogged = (state) => state.auth.user !== null;
export const getUser = (state) => state.auth.user;
export const getUserToken = (state) => state.auth.token;
export const getUserLoading = (state) => state.auth.loading;
export const getUserError = (state) => state.auth.error;
