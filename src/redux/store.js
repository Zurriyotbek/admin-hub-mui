import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import adminReducer from './slices/admin/index';
import patientsReducer from './slices/patients/index';
import authReducer from './slices/auth/index';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    patients: patientsReducer,
    auth: authReducer,
    // user: userReducer,
  },
  middleware: [thunk],
});
