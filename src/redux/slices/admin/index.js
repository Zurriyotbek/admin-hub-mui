import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
