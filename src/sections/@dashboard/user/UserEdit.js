import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  // React Tostify
  const notify = (status) => {
    switch (status) {
      case 'success':
        toast.success('Successfully updated!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'error':
        toast.error('Error updating', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'warning':
        toast.warn('Write !', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        break;
    }
  };

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
        .then(() => {
          notify('success');
          window.location.reload();
        })
        .catch(() => {
          notify('error');
        });
    }
  };

  return (
    <div>
      <ToastContainer />
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
          <MenuItem value={'PROCESS'}>Processing</MenuItem>
          <MenuItem value={'PENDING'}>Pending</MenuItem>
        </Select>
        <Button variant="contained" sx={styles.button} onClick={handleSubmit}>
          Confirm
        </Button>
      </FormControl>
    </div>
  );
}
