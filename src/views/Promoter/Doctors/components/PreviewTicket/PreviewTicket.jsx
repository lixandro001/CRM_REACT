import React, { useState } from 'react';
import Scrollbars from '../../../../../components/Scrollbar';
import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { fCurrency } from 'src/utils/formatNumber';
import { useSnackbar } from 'notistack';
import {
  IconButton,
  Tooltip,
  Drawer,
  Grid,
  Typography,
  List,
  Divider,
  Box,
  Card,
  Button,
  CardHeader,
  CardContent,
  TextField
} from '@material-ui/core';

// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailCommission,
  putRegisterObservationTicket
} from 'src/redux/slices/promoter';

// -----------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  line: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: theme.spacing(2)
    }
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1)
    }
  },
  drawerPaper: {
    width: 700,
    background: theme.palette.background.default
  },
  card: {
    padding: '5px',
    boxShadow: 'none'
  },
  button: {
    textAlignLast: 'center',
    paddingTop: '30px'
  }
}));

const PreviewTicket = ({
  ticket,
  numoscab,
  peroscab,
  anooscab,
  numsuc,
  numemp
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { detailCommision, isError, message } = useSelector(
    (state) => state.promoter
  );

  const [open, setOpen] = useState(false);
  const handleOpenSettings = () => {
    setOpen(true);
    dispatch(getDetailCommission(numoscab, peroscab, anooscab, numsuc, numemp));
  };

  const handleCloseSettings = () => {
    setOpen(false);
  };

  const handleRegisterObservation = (event) => {
    event.preventDefault();
    const observation = document.getElementById('observacion').value;
    const anioscab = anooscab;
    dispatch(
      putRegisterObservationTicket({
        numoscab,
        anioscab,
        peroscab,
        numsuc,
        numemp,
        observation
      })
    );
    if (isError) {
      enqueueSnackbar(message, { variant: 'success' });
    } else {
      enqueueSnackbar(message, { variant: 'error' });
    }
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Detalles">
        <IconButton onClick={handleOpenSettings}>
          <Icon width={20} height={20} icon={moreVerticalFill} />
        </IconButton>
      </Tooltip>

      {detailCommision.data && (
        <Drawer
          open={open}
          anchor="right"
          onClose={handleCloseSettings}
          classes={{
            root: classes.drawer,
            paper: classes.drawerPaper
          }}
        >
          <Scrollbars>
            <List className={classes.title}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Typography component="span" variant="h4" color="textPrimary">
                    TICKET
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="textPrimary"
                  >
                    N°{ticket}
                  </Typography>
                </Grid>
              </Grid>
            </List>
            <Divider />
            <Divider sx={{ mb: 1 }} />
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.line}>
                  <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>
                    Datos Generales
                  </Typography>
                </div>
                <div className={classes.line}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Paciente &nbsp;
                  </Typography>
                  <Typography variant="subtitle2">
                    {detailCommision.data.patient}
                  </Typography>
                </div>
                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Documento
                  </Typography>
                  <Typography variant="subtitle2">
                    {detailCommision.data.dni === ''
                      ? 'NO TIENE DNI'
                      : detailCommision.data.dni}
                  </Typography>
                </div>

                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Edad:&nbsp;
                  </Typography>
                  <Typography variant="body2">
                    {detailCommision.data.age === ''
                      ? '-'
                      : detailCommision.data.age}{' '}
                    años&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Sexo:&nbsp;
                  </Typography>

                  <Typography variant="body2">
                    {detailCommision.data.sex === 'FEM'
                      ? 'FEMEMINO'
                      : 'MASCULINO'}
                  </Typography>
                </div>
                <Divider sx={{ mb: 1 }} />
                <div className={classes.line}>
                  <Typography variant="subtitle2">
                    {detailCommision.data.id_cia}-{detailCommision.data.des_cia}
                  </Typography>
                </div>

                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    RUC
                  </Typography>
                  <Typography variant="subtitle2">
                    {detailCommision.data.ruc_cia}
                  </Typography>
                </div>

                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Modalidad
                  </Typography>
                  <Typography variant="subtitle2">
                    {detailCommision.data.modality}
                  </Typography>
                </div>

                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tarifa
                  </Typography>
                  <Typography variant="subtitle2">
                    {detailCommision.data.tarifa}
                  </Typography>
                </div>
              </CardContent>

              <Divider sx={{ mb: 1 }} />

              <CardHeader
                title={` RESUMEN`}
                subheader={`${detailCommision.data.entries}`}
              />

              <CardContent>
                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Sub Total
                  </Typography>
                  <Typography variant="subtitle2">
                    S/{fCurrency(detailCommision.data.subtotal)}
                  </Typography>
                </div>
                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Descuento
                  </Typography>
                  <Typography variant="subtitle2">
                    S/{fCurrency(detailCommision.data.discount_price)}
                  </Typography>
                </div>
                <div className={classes.row}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    IGV
                  </Typography>
                  <Typography variant="subtitle2">
                    S/{fCurrency(detailCommision.data.igv)}
                  </Typography>
                </div>

                <Divider sx={{ mb: 2 }} />

                <div className={classes.row}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: 'error.main' }}
                    >
                      S/{fCurrency(detailCommision.data.total)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                      (incluye IGV)
                    </Typography>
                  </Box>
                </div>
                {detailCommision.data.observation.length > 0 ? (
                  <div className={classes.row}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                    >
                      Observación
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontStyle: 'italic' }}
                    >
                      {detailCommision.data.observation}
                    </Typography>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterObservation}>
                    <TextField
                      id="observacion"
                      sx={{ mt: 3 }}
                      fullWidth
                      label="Observar Ticket"
                      variant="outlined"
                      color="secondary"
                    />

                    <div className={classes.button}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleRegisterObservation}
                      >
                        OBSERVAR TICKET
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </Scrollbars>
        </Drawer>
      )}
    </div>
  );
};

export default PreviewTicket;
