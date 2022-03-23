import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import personFill from '@iconify-icons/eva/person-fill';
import starFill from '@iconify-icons/eva/star-fill';
import shakeFill from '@iconify-icons/eva/shake-fill';
import telephoneFill from '@iconify-icons/eva/phone-fill';
import emailFill from '@iconify-icons/eva/email-fill';
import homeFill from '@iconify-icons/eva/home-fill';
import roundBusinessCenter from '@iconify-icons/ic/round-business-center';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';

//------------------------REDUX----------------------------

import { useSelector } from 'react-redux';

//------------------------------------------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  line: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: theme.spacing(2)
    }
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2)
  }
}));

// -------------------------------------------------------------------------------------------------------------------------------------------

AboutCard.propTypes = {
  className: PropTypes.string
};

function AboutCard({ className }) {
  const classes = useStyles();
  const {
    nombre,
    numero_documento,
    telefono,
    id_rol,
    direccion,
    tipo_rol
  } = useSelector((state) => state.auth.username.data);

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title="Información Personal" />
      <CardContent>
        <Divider />
        <div className={classes.line}>
          <Icon icon={personFill} className={classes.icon} />
          <Typography variant="body2">
            NOMBRE: &nbsp;
            {nombre}
          </Typography>
        </div>
        <div className={classes.line}>
          <Icon icon={personFill} className={classes.icon} />
          <Typography variant="body2">
            NUMERO DE DOCUMENTO: &nbsp;{numero_documento}
          </Typography>
        </div>
        <div className={classes.line}>
          <Icon icon={telephoneFill} className={classes.icon} />
          <Typography variant="body2">TELEFONO: &nbsp;{telefono}</Typography>
        </div>
        <div className={classes.line}>
          <Icon icon={starFill} className={classes.icon} />
          <Typography variant="body2">IDPERFIL: &nbsp;{id_rol}</Typography>
        </div>
        <div className={classes.line}>
          <Icon icon={homeFill} className={classes.icon} />
          <Typography variant="body2">DIRECCION: &nbsp;{direccion}</Typography>
        </div>
        <div className={classes.line}>
          <Icon icon={personFill} className={classes.icon} />
          <Typography variant="body2">
            NOMBRE DEL ROL: &nbsp;{tipo_rol}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
