import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

//----redux------------------------------
import { proccessPeriod } from 'src/redux/slices/supervisor';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function BtnProcess() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AutorenewIcon />}
        onClick={() => dispatch(proccessPeriod())}
      >
        Procesar
      </Button>

      <Button
        variant="contained"
        color="secondary"
        disabled
        className={classes.button}
        startIcon={<SettingsBackupRestoreIcon />}
      >
        Deshacer
      </Button>
    </div>
  );
}
