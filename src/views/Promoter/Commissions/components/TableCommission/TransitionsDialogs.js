import React, { forwardRef, useState } from 'react';
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
import CloseIcon from '@material-ui/icons/CloseSharp';
import CircleIcon from '@material-ui/icons/CircleOutlined';
import { useSnackbar } from 'notistack';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import { btnAccordance, btnUndo } from 'src/redux/slices/promoter';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TransitionsDialogs({ title }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { statusCurrentList, message, isLoading } = useSelector(
    (state) => state.promoter
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionButtons = async () => {
    try {
      if (statusCurrentList.data.process_status_code === 'D') {
        dispatch(btnUndo());

        if (!isLoading && message) {
          enqueueSnackbar(message, { variant: 'success' });
        }
      } else {
        dispatch(btnAccordance());
        if (!isLoading && message) {
          enqueueSnackbar(message, { variant: 'success' });
        }
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Tooltip
        title="Mensaje por definir por KSALAS/EBENAVIDES"
        placement="top"
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<CircleIcon />}
          onClick={handleClickOpen}
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
            Esta acción aceptará/deshara por la promotora ⚠️
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={handleActionButtons}>
            Aceptar
          </Button>

          <Button variant="contained" onClick={handleActionButtons}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TransitionsDialogs;
