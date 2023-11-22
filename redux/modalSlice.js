import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModalOpen: false,
  signupModalOpen: false,
  openSideBar: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
    openSideBarModal: (state) => {
      state.openSideBar = true
    },
    closeSideBarModal: (state) => {
      state.openSideBar = false
    }
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
  openSideBarModal,
  closeSideBarModal
} = modalSlice.actions;

export default modalSlice.reducer;
