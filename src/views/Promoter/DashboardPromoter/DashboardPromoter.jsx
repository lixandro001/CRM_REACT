import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Container, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CommissionsTopNotCancel from './components/CommissionTopNotCancel';
import CommissionsTopCancel from './components/CommissionTopCancel/CommissionTopCancel';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  getCommissionTopCancel,
  getCommissionTopNotCancel,
  getCommissionTopService,
  getStatusCurrentPeriod
} from 'src/redux/slices/promoter';
import { getInfoUser } from 'src/redux/slices/auth';
import CommissionTopService from './components/CommissionTopService';
import {
  CardOutstanding,
  CardCancel,
  CardProduction,
  CardTotal
} from '../Commissions/components/CardAmount';
import CommissionTopServiceGrafic from './components/CommissionTopServiceGrafic';
import { varSlideOutRight } from 'src/components/animate';
import { useToken } from '../../../hooks/useToken';

// -----------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  caja: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px'
  }
}));

// -----------------------------------------------------

function DashboardPromoter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    commissionTopNotCancel,
    commissionTopCancel,
    commissionTopService
  } = useSelector((state) => state.promoter);
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const { isAuth } = useToken();

  useEffect(() => {
    if (!isAuth) {
      localStorage.clear();
      window.location.href = '/';
    }
  }, [isAuth]);

  //Cuando el usuario se logee obsrva cualquier cambio
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/promoter/dashboard'); // Se redirecciona a la principal
    } else {
      //Verificamos si existe el token del usuario a nivel local
      if (localStorage.getItem('token')) {
        history.push('/promoter/dashboard'); // Se redirecciona a la principal
      } else {
        history.push('/'); // Se redirecciona a la principal
      }
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    dispatch(getCommissionTopNotCancel());
    dispatch(getCommissionTopCancel());
    dispatch(getStatusCurrentPeriod());
    dispatch(getCommissionTopService());
    dispatch(getInfoUser());
  }, [dispatch]);

  return (
    <Page title="Dashboard" className={classes.root}>
      {username.data && (
        <Box sx={{ pb: 5 }} variants={varSlideOutRight}>
          {username.data.sex === 'Femenino' ? (
            <Typography variant="h4">
              Hola, Bienvenida {username.data.nombre} 👩🏻‍💼
            </Typography>
          ) : (
            <Typography variant="h4">
              Hola, Bienvenido {username.data.nombre} 👨🏻‍💼
            </Typography>
          )}
        </Box>
      )}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CardOutstanding />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardProduction />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardCancel />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardTotal />
          </Grid>

          {commissionTopNotCancel.data && (
            <Grid item xs={12} md={6} lg={6}>
              <CommissionsTopNotCancel />
            </Grid>
          )}

          {commissionTopCancel.data && (
            <Grid item xs={12} md={6} lg={6}>
              <CommissionsTopCancel />
            </Grid>
          )}

          {commissionTopService.data && (
            <Grid item xs={12} md={6} lg={6}>
              <CommissionTopService />
            </Grid>
          )}

          {commissionTopService.data && (
            <Grid item xs={12} md={6} lg={6}>
              <CommissionTopServiceGrafic />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardPromoter;
