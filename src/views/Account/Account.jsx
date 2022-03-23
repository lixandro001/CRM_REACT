import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import AccountDetails from './components/AccountDetails';
import { useHistory } from 'react-router-dom';
// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser } from 'src/redux/slices/auth';

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

function Account() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuthenticated, username } = useSelector((state) => state.auth);

  //Cuando el usuario se logee obsrva cualquier cambio
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/user/profile'); // Se redirecciona a la principal
    } else {
      //Verificamos si existe el token del usuario a nivel local
      if (localStorage.getItem('token')) {
        history.push('/user/profile'); // Se redirecciona a la principal
      } else {
        history.push('/'); // Se redirecciona a la principal
      }
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    dispatch(getInfoUser()); //verificamos si esta logeado y obtenemos información
  }, [dispatch]);

  return (
    <Page title="Dashboard | SuizaWhatsApp" className={classes.root}>
      <Container maxWidth="xl">
        <Box sx={{ pb: 3 }}>
          <Typography variant="h4">Información de la cuenta</Typography>
        </Box>
        <Grid container spacing={3}>
          {username.data && (
            <Grid item xs={12} md={6} lg={4}>
              <AccountDetails />
            </Grid>
          )}
          {/* <Grid item xs={12} md={6} lg={8}>
            <ServiceSucursal />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ResultExam />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <TableReportResultExam />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

export default Account;
