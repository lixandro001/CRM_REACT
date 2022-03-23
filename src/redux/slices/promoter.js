import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../../config';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isError: false,
  message: null,
  commissionList: {},
  portfolioList: {},
  detailCommision: {},
  statusCurrentList: {},
  commissionTopCancel: {},
  commissionTopNotCancel: {},
  commissionTopService: {},
  registerObservationTicket: {},
  reportExcelPromoters: {}
};

const promoterSlice = createSlice({
  name: 'PROMOTER',
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

    // GET COMMISIONS LIST PROMOTER
    getCommissionsListSuccess(state, action) {
      state.isLoading = false;
      state.commissionList = action.payload;
    },

    // GET PORTAFOLIO PROMOTER
    getPortfolioListSuccess(state, action) {
      state.isLoading = false;
      state.portfolioList = action.payload;
    },

    // GET STADO DEL PERIODO
    getStatusCurrentPeriodSuccess(state, action) {
      state.isLoading = false;
      state.statusCurrentList = action.payload;
    },

    // GET COMMISIONS LIST PROMOTER
    getDetailCommisionSuccess(state, action) {
      state.isLoading = false;
      state.detailCommision = action.payload;
    },

    putRegisterObservationTicketSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.registerObservationTicket = action.payload;
    },

    // deshacer-undo
    btnUndoSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.statusCurrentList.data.process_status_code =
        action.payload.data.state;
      state.statusCurrentList.data.process_status_button = 'Conforme';
    },

    //agregar un registro
    btnAddNewCategorySuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.statusCurrentList.data.process_status_code =
        action.payload.data.state;
      state.statusCurrentList.data.process_status_button = 'Agregar';
    },

    DeleteCategoriaSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.statusCurrentList.data.process_status_code =
        action.payload.data.state;
      state.statusCurrentList.data.process_status_button = 'Eliminar';
    },

    // acuerdo-accordance
    btnAccordanceSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.statusCurrentList.data.process_status_code =
        action.payload.data.state;
      state.statusCurrentList.data.process_status_button = 'Deshacer';
    },

    getCommissionTopCancelSuccess(state, action) {
      state.isLoading = false;
      state.commissionTopCancel = action.payload;
    },

    getCommissionTopNotCancelSuccess(state, action) {
      state.isLoading = false;
      state.commissionTopNotCancel = action.payload;
    },

    getCommissionTopServiceSuccess(state, action) {
      state.isLoading = false;
      state.commissionTopService = action.payload;
    },
    //REPORTE DE PROMOTORAS
    getReportExcelPromotersSuccess(state, action) {
      state.isLoading = false;
      state.reportExcelPromoters = action.payload;
    }
  }
});

// Reducer
export default promoterSlice.reducer;

// Actions
export const {
  newRequest,
  hasError,
  getCommissionsListSuccess,
  getPortfolioListSuccess,
  getDetailCommisionSuccess,
  getStatusCurrentPeriodSuccess,
  btnUndoSuccess,
  btnAddNewCategorySuccess,
  DeleteCategoriaSuccess,
  btnAccordanceSuccess,
  getCommissionTopCancelSuccess,
  getCommissionTopNotCancelSuccess,
  getCommissionTopServiceSuccess,
  putRegisterObservationTicketSuccess,
  getReportExcelPromotersSuccess
} = promoterSlice.actions;

// ----------------------------------------------------------------------
// Obtenemos la lista de comisiones de las vendedoras
// export function getCommissionsList(page = '1', query = '') {
//   //value es el numero de página
//   const data = {
//     query,
//     page
//   };
//   return (dispatch) => {
//     if (data) {
//       dispatch(newRequest());
//       const params = `query=${data.query}&page=${data.page}`; //meter query
//       axios('get', `${URL.produc}/categoria/listado-categoria?${params}`, true)
//         .then((data) => {
//           dispatch(getCommissionsListSuccess({ data }));
//         })
//         .catch((err) => {
//           const message = err.message;
//           dispatch(hasError(message));
//         });
//     }
//   };
// }

export function getCategoriaList(page = '1', query = '') {
  //value es el numero de página
  const data = {
    query,
    page
  };
  return (dispatch) => {
    if (data) {
      dispatch(newRequest());
      const params = `query=${data.query}&page=${data.page}`; //meter query
      axios('get', `${URL.produc}/categoria/listado-categoria?${params}`, true)
        .then((data) => {
          dispatch(getCommissionsListSuccess({ data }));
        })
        .catch((err) => {
          const message = err.message;
          dispatch(hasError(message));
        });
    }
  };
}

// ----------------------------------------------------------------------
// Obtenemos la lista de PORTAFOLIO de las promotoras
export function getPortfolioList(value = '1', query = '') {
  //value es el numero de página
  const data = {
    query,
    value
  };
  return (dispatch) => {
    if (data) {
      dispatch(newRequest());
      console.log('estoy en el metodo');
      const params = `query=${data.query}&page=${data.value}`; //meter query
      axios('get', `${URL.produc}/seller/list-cia-portfolio?${params}`, true)
        .then((data) => {
          console.log('YA ENTRE AL EMTODO');
          dispatch(getPortfolioListSuccess({ data }));
        })
        .catch((err) => {
          const message = err.message;
          dispatch(hasError(message));
        });
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Obtenemos la lista de comisiones de las vendedoras
export function getDetailCommission(idcategoria) {
  return (dispatch) => {
    if (idcategoria) {
      dispatch(newRequest());
      const params = `idcategoria=${idcategoria}`; //meter query
      axios(
        'get',
        `${URL.produc}/Categoria/Obtener-detalle-categoria?${params}`,
        true
      )
        .then((data) => {
          dispatch(getDetailCommisionSuccess({ data }));

          console.log(data);
        })
        .catch((err) => {
          const message = err.message;
          dispatch(hasError(message));
        });
    }
  };
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// Obtenemos el estado del período actual
export function getStatusCurrentPeriod() {
  return (dispatch) => {
    dispatch(newRequest());
    axios(
      'get',
      `${URL.produc}/commission/promoter/get-me-status-current-period`,
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
//  BUTTON DESHACER
export function btnUndo(requestData) {
  return (dispatch) => {
    dispatch(newRequest());

    axios('post', URL.produc + '/commission/undo', true, requestData)
      .then((data) => {
        dispatch(btnUndoSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
// ----------------------------------------------------------------------
//  BOTON ACCORDANCE

export function btnAccordance(requestData) {
  return (dispatch) => {
    dispatch(newRequest());
    axios('post', URL.produc + '/commission/accordance', true, requestData)
      .then((data) => {
        dispatch(btnAccordanceSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}

// ----------------------------------------------------------------------
// DASHBOARD GRÁFICO TOP CANCELADOS
export function getCommissionTopCancel() {
  return (dispatch) => {
    dispatch(newRequest());
    axios('get', `${URL.produc}/dashboard/get-commission-top-10-cancel`, true)
      .then((data) => {
        dispatch(getCommissionTopCancelSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// DASHBOARD GRÁFICO TOP NO CANCELADOS
export function getCommissionTopNotCancel() {
  return (dispatch) => {
    dispatch(newRequest());
    axios(
      'get',
      `${URL.produc}/dashboard/get-commission-top-10-not-cancel`,
      true
    )
      .then((data) => {
        dispatch(getCommissionTopNotCancelSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// DASHBOARD GRÁFICO TOP SERVICIO
export function getCommissionTopService() {
  return (dispatch) => {
    dispatch(newRequest());
    axios('get', `${URL.produc}/dashboard/get-commission-top-10-service`, true)
      .then((data) => {
        dispatch(getCommissionTopServiceSuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
// ----------------------------------------------------------------------
// DASHBOARD GRÁFICO TOP SERVICIO

//----------------------------------------------------------------------------
//-------------------------------------OBTENER Excel--------------------------
export function getReportExcelPromoters() {
  return (dispatch) => {
    dispatch(newRequest());
    axios('get', `${URL.produc}/categoria/exportar-excel-base64`, true)
      .then((data) => {
        dispatch(getReportExcelPromotersSuccess({ data }));
        console.log(data);
        console.log('entro excel lixa');
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
//-------------------------------------------------------
//----------Boton para agregar una nueva categoria-------
export function btnAddNewCategory(requestData) {
  return (dispatch) => {
    dispatch(newRequest());
    axios(
      'post',
      URL.produc + '/categoria/agregar-categoria',
      true,
      requestData
    )
      .then((data) => {
        dispatch(btnAddNewCategorySuccess({ data }));
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
//-----boton para eliminar
export function DeleteCategoria(requestData) {
  return (dispatch) => {
    dispatch(newRequest());
    axios(
      'post',
      URL.produc + '/categoria/eliminar-categoria',
      true,
      requestData
    )
      .then((data) => {
        dispatch(DeleteCategoriaSuccess({ data }));
        dispatch(getCategoriaList());
      })
      .catch((err) => {
        const message = err.message;
        dispatch(hasError(message));
      });
  };
}
///--------------------detalle categoria para editar
export function getDetailCategory(idcategoria) {
  return (dispatch) => {
    if (idcategoria) {
      dispatch(newRequest());
      const params = `idcategoria=${idcategoria}`; //meter query
      axios(
        'get',
        `${URL.produc}/Categoria/Obtener-detalle-categoria?${params}`,
        true
      )
        .then((data) => {
          dispatch(getDetailCommisionSuccess({ data }));

          console.log(data);
        })
        .catch((err) => {
          const message = err.message;
          dispatch(hasError(message));
        });
    }
  };
}
