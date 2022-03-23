import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center'
  },
  footer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: theme.palette.primary.light,
    textDecoration: 'none'
  },
  fab: {
    margin: theme.spacing(3),
    position: 'fixed',
    bottom: 35,
    right: 0
  },
  icon: {
    transform: 'rotate(90deg)'
  },
  text: {
    fontSize: 'small',
    color: theme.palette.primary.light,
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.primary.light
    }
  },

  text2: {
    fontSize: 'small',
    color: theme.palette.primary.light,
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.primary.main
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)} id="footer">
      <div className={classes.footer}>
        <Typography variant="subtitle2" color="primary">
          &copy; {new Date().getFullYear()}.{' '}
          <Link
            component="a"
            href="https://www.suizalab.com/"
            target="_blank"
            color="secondary"
            className={classes.text2}
          >
            SUIZA LAB - LABORATORIO CLÍNICO E IMÁGENES
          </Link>
        </Typography>
        <Typography variant="subtitle2" className={classes.text}>
          Todos los derechos reservados Suizalab S.A.C.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
