import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
// import * as yup from 'yup';
import { PATH_HOME } from '../../../../../routes/paths';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Link,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Divider,
  Typography
} from '@material-ui/core';
// -------redux--------------------
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../../../redux/slices/auth';
// ----------------
const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const defaultValues = {
    username: '',
    password: ''
  };

  // Obtener los valores del formulario
  const { handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = (data) => {
    dispatch(
      loginUser({
        username: data.username,
        password: data.password
      })
    );
  };
  //Cuando el usuario se logee obsrva cualquier cambio
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/promoter/dashboard'); // Se redirecciona a la principal
      enqueueSnackbar(message, { variant: 'success' });
    } else {
      //Verificamos si existe el token del usuario a nivel local
      if (localStorage.getItem('token')) {
        history.push('/promoter/dashboard'); // Se redirecciona a la principal
      } else {
        history.push('/'); // Se redirecciona a la principal
      }
    }
  }, [isAuthenticated, history, enqueueSnackbar, message]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Usuario"
            // helperText={errors.username?.message}
            // error={Boolean(errors.username?.message)}
          />
        )}
      />

      <Box sx={{ mb: 2 }} />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      />

      <Box
        sx={{
          my: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      />

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
      >
        Iniciar Sesión
      </LoadingButton>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <FormControlLabel control={<Checkbox />} label="Recuérdame" />
      </Box>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Link
            component={RouterLink}
            variant="subtitle2"
            to={PATH_HOME.urlEmpresa}
            target="_blank"
          >
            www.lixandro.com
          </Link>
        </Typography>
      </Divider>
    </form>
  );
};

export default LoginForm;
