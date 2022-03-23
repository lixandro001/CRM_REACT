import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import { useSnackbar } from 'notistack';

// ----------REDUX-----------------------
import { lockoutPeriod } from 'src/redux/slices/supervisor';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function BtnBlock() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, isError, message } = useSelector(
    (state) => state.supervisor
  );

  useEffect(() => {
    if (isError && message && message.trim().length > 0) {
      enqueueSnackbar(message, { variant: 'error' });
    } else if (!isError && message && message.trim().length > 0) {
      enqueueSnackbar(message, { variant: 'success' });
    }
  }, [isError, enqueueSnackbar, message, isLoading]);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<BlockIcon />}
        onClick={() => dispatch(lockoutPeriod())}
      >
        Bloquear
      </Button>
    </div>
  );
}
