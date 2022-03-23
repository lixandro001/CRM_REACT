import React from 'react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import {
  Section as SectionView,
  LoginForm as LoginFormView,
  SocialButtons
} from './components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Alert,
  Hidden,
  Grid,
  Container,
  LinearProgress
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------------
// REDUX
import { useSelector } from 'react-redux';

//-----------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '90vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    // paddingTop: 56,

    [theme.breakpoints.up('>sm')]: {
      height: '90%',
      paddingTop: 64
    },
    [theme.breakpoints.down('>sm')]: {
      height: 'auto'
    }
  },
  wrapLogin: {
    maxWidth: '876px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: '10px',
    boxShadow: theme.shadows[24]
  },

  container: {
    backgroundColor: theme.palette.background.paper
  },
  boxLogin: {
    maxWidth: '400px',
    left: 0,
    right: 0,
    margin: 'auto',
    padding: theme.spacing(2)
  },
  logo: {
    height: '150px',
    margin: theme.spacing(2, 0),
    textAlign: '-webkit-center',
    [theme.breakpoints.down('sm')]: {
      height: '150px'
    }
  },
  logoImg: {
    textAlign: 'center',
    height: '100%',
    cursor: 'pointer'
  }
}));

// ----------------------------------------------------------------------

const LoginView = () => {
  const classes = useStyles();
  const { message, error, isLoading } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Page title="Login">
        {isLoading && <LinearProgress color="primary" />}
        <div className={classes.wrapLogin}>
          <Grid
            container
            className={classes.container}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Hidden mdDown>
              <SectionView />
            </Hidden>

            <Grid item md={6} className={classes.boxLogin}>
              <div className={classes.logo}>
                <Logo
                  className={classes.logoImg}
                  onClick={() => {
                    history.push('/');
                  }}
                />
              </div>
              <Box
                sx={{
                  mb: 5
                }}
              ></Box>

              {error && (
                <Alert severity="error" sx={{ mb: 5 }}>
                  <strong>{message}</strong>
                </Alert>
              )}
              <LoginFormView />

              <SocialButtons />
            </Grid>
          </Grid>
        </div>
      </Page>
    </Container>
  );
};

export default LoginView;
