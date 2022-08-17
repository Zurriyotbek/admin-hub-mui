import { createSlice } from '@reduxjs/toolkit';
// import { auth } from '../../api/auth';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const { authStart, authSuccess, authFail, logout } = authSlice.actions;

// export const authCheckState = (user) => (dispatch) => {
//   dispatch(authStart());
//   if (user) {
//     dispatch(authSuccess(user));
//   } else {
//     dispatch(logout());
//   }
// };

// export const auth = (email, password) => (dispatch) => {
//     dispatch(authStart());
//     auth(email, password)
//         .then((res) => {
//             dispatch(authSuccess(res.data));
//         }).catch((err) => {
//             dispatch(authFail(err.message));
//         }
//     );
// }

// export const logout = () => (dispatch) => {
//     dispatch(logout());
// }

export default authSlice.reducer;
