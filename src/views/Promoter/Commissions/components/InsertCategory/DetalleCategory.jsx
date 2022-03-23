import React, { useState } from 'react';
import Scrollbars from '../../../../../components/Scrollbar';
import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import personFill from '@iconify-icons/eva/person-fill';
import starFill from '@iconify-icons/eva/star-fill';
import shakeFill from '@iconify-icons/eva/shake-fill';
import telephoneFill from '@iconify-icons/eva/phone-fill';
import emailFill from '@iconify-icons/eva/email-fill';
import homeFill from '@iconify-icons/eva/home-fill';
import file from '@iconify-icons/eva/file-outline';
import edit from '@iconify-icons/eva/edit-2-fill';
import close from '@iconify-icons/eva/close-circle-fill';

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
  TextField,
  Toolbar
} from '@material-ui/core';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import { getDetailCommission } from 'src/redux/slices/promoter';
import { getDetailCategory } from 'src/redux/slices/promoter';
import TreeService from './components/TreeService';
import TreeInfoBussiness from './components/TreeInfoBussiness';
// -----------------------------------------------------

//const styles = useStyles();

const useStyles = makeStyles((theme) => ({
  /**modal: {
    // position: 'absolute',
    width: 600,
    height: 400
    // backgroundColor: 'white',
    //border: '10px solid #000',
    // boxShadow: theme.shadows[80],
    // padding: '1px 10px 14px',
    // top: '50%',
    //left: '50%',
    // transform: 'translate(-50%, -50%)'
  },
  textfiel: {
    width: '100%'
  },
  button: {
    textAlign: 'center'
  } */
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
    width: 500,
    background: theme.palette.background.default
  },
  card: {
    padding: '50px',
    boxShadow: 'none'
  },
  button: {
    textAlignLast: 'center',
    paddingTop: '100px'
  }
}));

const DetalleCategory = ({ idcategoriaval }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { detailCommision, isError, message } = useSelector(
    (state) => state.promoter
  );

  const [open, setOpen] = useState(false);
  const handleOpenSettings = () => {
    setOpen(true);
    dispatch(getDetailCommission(idcategoriaval));
  };

  const handleCloseSettings = () => {
    setOpen(false);
  };

  const handleRegisterObservation = (event) => {
    event.preventDefault();
    const observation = document.getElementById('observacion').value;
    dispatch();
    if (isError) {
      enqueueSnackbar(message, { variant: 'success' });
    } else {
      enqueueSnackbar(message, { variant: 'error' });
    }
    setOpen(false);
  };

  return (
    <div>
      <Toolbar title="EDITAR CATEGORIA">
        <IconButton onClick={handleOpenSettings}>
          <Icon width={38} height={38} icon={edit} />
        </IconButton>
      </Toolbar>
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
            <Card>
              <CardContent>
                <br /> <br /> <br />
                <Grid
                  item
                  xs={12}
                  style={{
                    borderTop: 3,
                    borderTopColor: '#919295',
                    borderTopStyle: 'solid',
                    borderBottomWidth: 2,
                    borderBottomColor: '#919295',
                    borderBottomStyle: 'solid'
                  }}
                >
                  <h1 style={{ margin: 5, fontSize: '18pt' }}>
                    Editar Categoria
                  </h1>
                </Grid>
                <br />
                <br />
                <Grid item xs={5} style={{ textAlign: 'left' }}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={detailCommision.data.nombre}
                    style={{ width: 400 }}
                  />
                </Grid>
                <br />
                <Grid item xs={5} style={{ textAlign: 'left' }}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={detailCommision.data.descripcion}
                    style={{ width: 400 }}
                  />
                </Grid>
                <br />
                {/** <Grid item xs={5} style={{ textAlign: 'left' }}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    readonly
                    value={
                      detailCommision.data.estado === true
                        ? 'activo'
                        : 'inactivo'
                    }
                    style={{ width: 400 }}
                  />
                </Grid> */}
              </CardContent>
            </Card>
          </Scrollbars>
        </Drawer>
      )}
    </div>
  );
};
export default DetalleCategory;
