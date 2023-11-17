import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  subscribed: null,
  currentUser: null,
  uid: null,
  premium: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.email = action.payload.email),
        (state.password = action.payload.password);
    },
    signOutUser: (state) => 
    {
        state.email = null,
        state.password = null
    },
    monthlySub: (state) => 
    {
      state.premium = "Premium"
    },
    yearlySub: (state) => 
    {
      state.premium = "Premium Yearly"
    },
    setPremiumStatus: (state) => 
    {
      state.premium = action.payload
    }
  },
});

export const { setUser, signOutUser, monthlySub, yearlySub, setPremiumStatus } = userSlice.actions;

export default userSlice.reducer;
