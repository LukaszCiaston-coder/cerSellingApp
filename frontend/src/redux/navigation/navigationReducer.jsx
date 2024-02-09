// navigationReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  isProfileModalOpen: false,
  isProfilePageOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      state.isProfilePageOpen = false;
    },
    toggleProfileModal: (state) => {
      state.isProfileModalOpen = !state.isProfileModalOpen;
    },
    toggleUserProfilePage: (state) => {
      state.isProfilePageOpen = !state.isProfilePageOpen;
    },
  },
});

export const { toggleMobileMenu, toggleProfileModal, toggleUserProfilePage } =
  navigationSlice.actions;

export const navigationReducer = navigationSlice.reducer;
