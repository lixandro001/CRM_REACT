import React, { useEffect } from 'react';
import { TablePortfolio } from './components';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton, Grid, Container } from '@material-ui/core';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  getPortfolioList,
  getStatusCurrentPeriod
} from 'src/redux/slices/promoter';
import { getInfoUser } from 'src/redux/slices/auth';
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

const Doctor = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { portfolioList } = useSelector((state) => state.promoter);
  const { isAuth } = useToken();

  useEffect(() => {
    if (!isAuth) {
      localStorage.clear();
      window.location.href = '/';
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getPortfolioList());
    dispatch(getStatusCurrentPeriod());
    dispatch(getInfoUser());
  }, [dispatch]);

  return (
    <Page title="Mis Comisiones | Suiza Ventas" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {!portfolioList.data ? (
            <Grid item xs={12} md={12} lg={12}>
              {SkeletonLoad}
            </Grid>
          ) : (
            portfolioList.data && (
              <Grid item xs={12} md={12} lg={12}>
                <TablePortfolio />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Doctor;
