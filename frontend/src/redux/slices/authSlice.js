import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  isAuthenticated: !!userFromStorage,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
// 
    //  LOGIN SUCCESS
   loginSuccess: (state, action) => {
  state.user = action.payload.user;
  state.role = action.payload.role;
  state.isAuthenticated = true;
  state.loading = false;
},

    //  LOGOUT
   logout: (state) => {
  state.user = null;
  state.isAuthenticated = false;
  localStorage.removeItem("user");
},

    //  OPTIONAL: LOADING
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;
  
