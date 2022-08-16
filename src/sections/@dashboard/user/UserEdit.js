import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
//
import { useSelector } from 'react-redux';
import Axios from '../../../api/axios';

const styles = {
  button: {
    marginTop: '30px',
    padding: '10px',
    fontSize: '16px',
  },
};

// /api/v1/patient/delete/
const URL = 'api/v1/patient/update-status';

export default function userEdit() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const patient = useSelector((state) => state.patients.selectedPatient);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      patientId: patient.id,
      status,
    };

    if (status) {
      Axios.put(URL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
        <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={'COMPLETED'}>Completed</MenuItem>
          <MenuItem value={'PROCESSING'}>Processing</MenuItem>
          <MenuItem value={'PENDING'}>Pending</MenuItem>
        </Select>
        <Button variant="contained" sx={styles.button} onClick={handleSubmit}>
          Confirm
        </Button>
      </FormControl>
    </div>
  );
}
