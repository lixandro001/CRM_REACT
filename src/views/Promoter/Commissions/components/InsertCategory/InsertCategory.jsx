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
import { getDetailCommission } from 'src/redux/slices/promoter';

import TreeService from './components/TreeService';
import TreeInfoBussiness from './components/TreeInfoBussiness';

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
    width: 310,
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

const InserCategory = ({ idcategoriaval }) => {
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
        ></Drawer>
      )}
    </div>
  );
};

export default InserCategory;
