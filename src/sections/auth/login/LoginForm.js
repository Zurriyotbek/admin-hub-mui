import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// React Tostify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// components
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setAdmin } from '../../../redux/slices/admin/index';
import Axios from '../../../api/axios';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const notify = () => {
    toast.warn('Oops! Incorrect username or password.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (e) => {
    const { username, password } = e;

    // /api/v1/authorization/login
    // https://medifast.eduspace.me/

    // const response = await fetch('https://medifast.eduspace.me/api/v1/authorization/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // });

    // if (response.status === 400) {
    //   notify();
    // }

    // if (response.status === 200) {
    //   const data = await response.json();
    //   localStorage.setItem('token', data.token);
    //   navigate('/dashboard/app', { replace: true });
    // }

    Axios.post('api/v1/authorization/login', {
      username,
      password,
    })
      .then((response) => {
        const token = response.data.jwt;
        const user = response.data;
        localStorage.setItem('admin_token', token);
        dispatch(setAdmin(user));
        navigate('/dashboard/app', { replace: true });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          notify();
        }
      });
  };

  return (
    <>
      <div style={{ zIndex: '9999', position: 'absolute' }}>
        {/* // eslint-disable-next-line react/button-has-type */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="username" label="Username" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ marginTop: '50px' }}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </>
  );
}
