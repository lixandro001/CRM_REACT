import React, { forwardRef, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
import { btnAddNewCategory } from 'src/redux/slices/promoter';

//getReportExcelPromoters

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TransitionNuevoCategoria({ title }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { reportExcelPromoters, message, isLoading } = useSelector(
    (state) => state.promoter
  );

  const [nombre, setName] = React.useState('');
  const [descripcion, setDetalle] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleName = (e) => {
    setName(e.target.value.toString());
  };

  const handleDetalle = (e) => {
    setDetalle(e.target.value.toString());
  };

  const handleActionButtons = async () => {
    try {
      dispatch(btnAddNewCategory({ nombre, descripcion }));

      console.log(nombre, descripcion);

      if (!isLoading && message) {
        enqueueSnackbar(message, { variant: 'success' });
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Tooltip title="" placement="top">
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
          {`¿Estás seguro de Agregar Una ${title}?`}
        </DialogTitle>

        <div style={{ marginTop: 40 }}>
          <Grid container>
            <Grid item xs={1}></Grid>

            <Grid item xs={5} style={{ textAlign: 'left' }}>
              <TextField
                id="outlined-basic"
                label="Nombre Categoria"
                variant="outlined"
                style={{ width: 300 }}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>

        <div style={{ marginTop: 40 }}>
          <Grid container>
            <Grid item xs={1}></Grid>

            <Grid item xs={5} style={{ textAlign: 'left' }}>
              <TextField
                id="outlined-basic"
                label="Descripcion Categoria"
                variant="outlined"
                style={{ width: 300 }}
                onChange={handleDetalle}
              />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleActionButtons}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TransitionNuevoCategoria;
