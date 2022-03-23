import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundRepeat: 'repeat',
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden'
  },
  image: {
    height: '600px'
  }
}));

// ----------------------------------------------------------------------

Section.propTypes = {
  className: PropTypes.string
};

function Section({ className }) {
  const classes = useStyles();

  return (
    <Grid item sm={6} className={clsx(classes.root, className)}>
      <img
        className={classes.image}
        src="/static/illustrations/loginlixa.svg"
        alt="imagen login"
      />
    </Grid>
  );
}

export default Section;
