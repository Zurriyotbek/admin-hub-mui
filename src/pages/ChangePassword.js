import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

// Mui Components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';

// React Tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Axios
import Axios from '../api/axios';

// Styles
const style = {
  marginLeft: '100px',
  maxWidth: '500px',
};

// URL
const URL = '/api/v1/admin/update-password';

// React Tostify
const notify = (status) => {
  switch (status) {
    case 'success':
      toast.success('Successfully updated password', {
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
      toast.error('Error updating the password', {
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
      toast.warn('Old password is not given!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'warning_new_password':
      toast.warn('New password is not given!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'empty':
      toast.error('Form is empty.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;

    case 'error_wrong_password':
      toast.error('Old password is wrong!', {
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

// ----------------------------------------------------------------------
export default function ChangePassword() {
  const admin = useSelector((state) => state.admin);

  const formRef = useRef();

  const [loading, setLoading] = useState(false);

  // Function to handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const form = new FormData(event.currentTarget);
    const oldPassword = form.get('old_password');
    const newPassword = form.get('new_password');

    const data = {
      oldPassword,
      newPassword,
      username: admin.username,
    };

    if (oldPassword === '' && newPassword === '') {
      notify('empty');
      setLoading(false);
      return;
    }
    if (oldPassword === '') {
      notify('warning');
      setLoading(false);
      return;
    }
    if (newPassword === '') {
      notify('warning_new_password');
      setLoading(false);
      return;
    }

    await Axios.put(URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notify('success');
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notify('error_wrong_password');
        } else {
          notify('error');
        }
      })
      .finally(() => {
        setLoading(false);
        formRef.current.reset();
        formRef.current.focus();
      });
  };
  // ----------------------------------------------------------------------

  return (
    <>
      <ToastContainer />
      <div style={style}>
        <Typography component="h1" variant="h3" align="center">
          Update password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} ref={formRef}>
          <TextField margin="normal" required fullWidth id="old_password" label="Old password" name="old_password" />
          <TextField margin="normal" required fullWidth id="new_password" label="New password" name="new_password" />
          <LoadingButton
            size="medium"
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1, width: '100%', fontSize: '20px' }}
            type="submit"
            loading={loading}
          >
            Confirm
          </LoadingButton>
        </Box>
      </div>
    </>
  );
}
