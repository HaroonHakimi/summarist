import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  plan: "basic",
  currentUser: null,
  uid: null,
  premium: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.email = action.payload),
        (state.uid = action.payload);
    },
    signOutUser: (state) => {
      (state.email = null), 
      (state.premium = null), 
      (state.uid = null);
    },
    monthlySub: (state) => {
      state.plan = "Premium";
    },
    yearlySub: (state) => {
      state.plan = "Premium Yearly";
    },
    setPremiumStatus: (state) => {
      state.premium = action.payload;
    },
  },
});

export const { setUser, signOutUser, monthlySub, yearlySub, setPremiumStatus } =
  userSlice.actions;

export default userSlice.reducer; 
