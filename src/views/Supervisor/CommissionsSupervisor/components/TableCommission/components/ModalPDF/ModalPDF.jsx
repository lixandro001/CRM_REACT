import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// ----------REDUX-----------------------
import { getReportPdfPromoters } from 'src/redux/slices/supervisor';
import { useDispatch, useSelector } from 'react-redux';
import UsePdfViewer from './UsePdfViewer';
//-------------------------------------

export default function MaxWidthDialog() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { reportPdfPromoters } = useSelector((state) => state.supervisor);

  //Para definir y pasar valor
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    dispatch(getReportPdfPromoters());
  }, []);

  const handleClickOpen = () => {
    if (reportPdfPromoters.data) {
      setPdf(`data:application/pdf;base64,${reportPdfPromoters.data.pdf}`);
      setOpen(true); //no se abrirá si no tiene data
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        PDF
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          PRODUCCIÓN DE PROMOTORAS
        </DialogTitle>
        <DialogContent>
          {reportPdfPromoters.data && pdf !== '' && <UsePdfViewer file={pdf} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
