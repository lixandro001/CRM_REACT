import { createSlice } from '@reduxjs/toolkit';
import { URL } from 'src/config';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isError: false,
  message: null,
  listSellerAccepted: {},
  statusCurrentList: {},
  proccessPeriod: {},
  lockoutPeriod: {},
  reportPdfPromoters: {}
};

const supervisorSlice = createSlice({
  name: 'SUPERVISOR',
  initialState,
  reducers: {
    // START LOADING
    newRequest(state) {
      state.isLoading = true;
      state.isError = false;
    },

    //HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    // GET LISTA DE PAGOS ACEPTADOS
    getListSellerAcceptedSuccess(state, action) {
      state.isLoading = false;
      state.listSellerAccepted = action.payload;
    },

    // GET STADO DEL PERIODO
    getStatusCurrentPeriodSuccess(state, action) {
      state.isLoading = false;
      state.statusCurrentList = action.payload;
    },

    //PROCESAR PERIODO
    proccessPeriodSuccess(state, action) {
      state.isLoading = false;
      state.proccessPeriod = action.payload;
    },

    //BLOQUEAR
    lockoutPeriodSuccess(state, action) {
      state.isLoading = false;
      state.lockoutPeriod = action.payload;
    },

    //REPORTE DE PROMOTORAS
    getReportPdfPromotersSuccess(state, action) {
      state.isLoading = false;
      state.reportPdfPromoters = action.payload;
    }
  }
});

// Reducer
export default supervisorSlice.reducer;

// Actions
export const {
  newRequest,
  hasError,
  getListSellerAcceptedSuccess,
  getStatusCurrentPeriodSuccess,
  proccessPeriodSuccess,
  lockoutPeriodSuccess,
  getReportPdfPromotersSuccess
} = supervisorSlice.actions;

// ----------------------------------------------------------------------
// Obtenemos la lsita de las promotras que aceptaron
export function getListSellerAccepted() {
  return (dispatch) => {
    dispatch(newRequest());
    axios(
      'get',
      `${URL.produc}/commission/supervisor/list-seller-accepted`,
      true
    )
      .then((data) => {
        dispatch(getListSellerAcceptedSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Obtenemos el estado del período actual para la sueprvisora

export function getStatusCurrentPeriod() {
  return (dispatch) => {
    dispatch(newRequest());
    axios(
      'get',
      `${URL.produc}/commission/supervisor/get-status-current-period`,
      true
    )
      .then((data) => {
        dispatch(getStatusCurrentPeriodSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}

// ----------------------------------------------------------------------
//  BOTON ACCORDANCE

export function proccessPeriod(requestData) {
  return (dispatch) => {
    dispatch(newRequest());

    axios(
      'post',
      URL.produc + '/commission/supervisor/proccess-period',
      true,
      requestData
    )
      .then((data) => {
        dispatch(proccessPeriodSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  BOTON ACCORDANCE

export function lockoutPeriod(requestData) {
  return (dispatch) => {
    dispatch(newRequest());

    axios(
      'post',
      URL.produc + '/commission/supervisor/lockout-period',
      true,
      requestData
    )
      .then((data) => {
        dispatch(lockoutPeriodSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
// ----------------------------------------------------------------------

// OBTENER PDF
export function getReportPdfPromoters() {
  return (dispatch) => {
    dispatch(newRequest());
    axios('get', `${URL.produc}/report/promoters`, true)
      .then((data) => {
        dispatch(getReportPdfPromotersSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
