import React, { forwardRef, useEffect, useState } from 'react';
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip
} from '@material-ui/core';
// import CircleIcon from '@material-ui/icons/CircleOutlined';
import DescriptionIcon from '@material-ui/icons/Description';
import { useSnackbar } from 'notistack';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import { getReportExcelPromoters } from 'src/redux/slices/promoter';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TransitionsDialogsExcel({ title }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { reportExcelPromoters } = useSelector((state) => state.promoter);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //descargar excel

  const handleDowloandExcel = (excelResult) => {
    console.log('respuesta de metodo de  excle');
    console.log(excelResult);

    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelResult}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = `CATEGORIAS`;
    downloadLink.click();
    enqueueSnackbar('El archivo fue descargado', { variant: 'success' });
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getReportExcelPromoters());
  }, []);

  const handleActionButtons = () => {
    try {
      if (reportExcelPromoters.data) {
        handleDowloandExcel(reportExcelPromoters.data.excel);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Tooltip title="Datos en excel" placement="top">
        <Button
          variant="contained"
          color="primary"
          startIcon={<DescriptionIcon />}
          onClick={handleClickOpen}
          style={{ marginLeft: '10px' }}
        >
          {title}
        </Button>
      </Tooltip>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`¿Estás seguro de ${title}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ested descarga los datos en formato excel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleActionButtons}>
            Descargar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TransitionsDialogsExcel;
