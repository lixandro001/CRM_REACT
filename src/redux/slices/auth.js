import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../../config';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: false,
  username: {},
  message: null
};

const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    // START LOADING
    newRequest(state) {
      state.isLoading = true;
      state.error = false;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload; //valor del username aca trae el objeto completo no tengo los datos
      state.message = 'Acceso correcto';
    },
    //ERROR
    loginError(state, action) {
      state.isAuthenticated = false;
      state.error = true;
      state.isLoading = false;
      state.message = action.payload;
    },

    //USER
    getInfoUserSuccess(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload; //valor del username aca trae el objeto completo no tengo los datos
    },
    //HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    }
  }
});

// Reducer - Aca va la data o los valores
export default authSlice.reducer;

// Actions - pasa la accion(un  grupo de data) para canbiar el state
export const {
  newRequest,
  loginSuccess,
  loginError,
  getInfoUserSuccess,
  hasError
} = authSlice.actions;

//--------------------------------------------------------------------------------------
export function loginUser(requestData) {
  return (dispatch) => {
    dispatch(newRequest());
    console.log(requestData);

    axios('post', URL.produc + '/Auth', false, requestData)
      .then((data) => {
        console.log(data);
        dispatch(loginSuccess({ data }));
        const token = data.access_token;
        const expireAt = data.expires_at;
        localStorage.setItem('token', token);
        localStorage.setItem('expireAt', expireAt);
      })
      .catch((err) => {
        if (err.message == '') {
          const message = 'Falta ingresar datos';
          dispatch(loginError(message));
        } else {
          const message = err.message;
          dispatch(loginError(message));
        }
      });
  };
}

// ----------------------------------------------------------------------

export function getInfoUser() {
  return (dispatch) => {
    dispatch(newRequest());
    axios('get', URL.produc + `/user/@me`, true)
      .then((data) => {
        console.log(data);
        dispatch(getInfoUserSuccess({ data }));
        localStorage.setItem('name', data.nombre);
        localStorage.setItem('user_name', data.numero_documento);
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
