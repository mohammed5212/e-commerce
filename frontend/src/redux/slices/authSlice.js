// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,        // { email, role, id }
//   isAuthenticated: false,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
// // 
//     //  LOGIN SUCCESS
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.loading = false;
//     },

//     //  LOGOUT
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },

//     //  OPTIONAL: LOADING
//     setAuthLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const {
//   loginSuccess,
//   logout,
//   setAuthLoading,
// } = authSlice.actions;

// export default authSlice.reducer;
