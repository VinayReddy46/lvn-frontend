import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;