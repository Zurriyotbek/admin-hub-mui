import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patientsList: [],
  selectedPatient: {},
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patientsList = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
  },
});

export const { setPatients, setSelectedPatient } = patientsSlice.actions;

export default patientsSlice.reducer;
