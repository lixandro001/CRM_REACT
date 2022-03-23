import React, { useEffect } from 'react';
import { TableCommission } from './components/';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton, Grid, Container } from '@material-ui/core';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  getListSellerAccepted,
  getStatusCurrentPeriod
} from 'src/redux/slices/supervisor';
import { getInfoUser } from 'src/redux/slices/auth';
import {
  CardOutstanding,
  CardCancel,
  CardProduction,
  CardTotal
} from './components/CardAmount';
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
const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2, mb: 5 }}
    />
  </>
);

const CommissionsSupervisor = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { listSellerAccepted } = useSelector((state) => state.supervisor);
  const { isAuth } = useToken();

  useEffect(() => {
    if (!isAuth) {
      localStorage.clear();
      window.location.href = '/';
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getListSellerAccepted());
    dispatch(getStatusCurrentPeriod());
    dispatch(getInfoUser());
  }, [dispatch]);

  return (
    <Page title="Supervisor Comisiones | Suiza Ventas" className={classes.root}>
      <Container maxWidth="xl">
        {/* <Card sx={{ pb: 5, mb: 3 }} className={classes.caja}> */}
        {/* <CardHeader title="MIS COMISIONES ABRIL DEL 2021" /> */}
        {/* <DateFilter /> */}
        {/* </Card> */}
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
          {!listSellerAccepted.data ? (
            <Grid item xs={12} md={12} lg={12}>
              {SkeletonLoad}
            </Grid>
          ) : (
            listSellerAccepted.data && (
              <Grid item xs={12} md={12} lg={12}>
                <TableCommission />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default CommissionsSupervisor;
