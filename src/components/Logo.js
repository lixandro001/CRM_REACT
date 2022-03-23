// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------se pone una imagen para el logo de inicio

export default function Logo({ ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/crm.png"
      height={40}
      {...other}
    />
  );
}
