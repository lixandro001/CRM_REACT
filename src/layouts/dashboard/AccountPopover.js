import React from 'react';
import { Icon } from '@iconify/react';
import powerFill from '@iconify-icons/eva/power-fill';
import { MIconButton } from '../../components/@material-extend';
import { Hidden } from '@material-ui/core';
// ----------------------------------------------------------------------

function Account({ text = '' }) {
  return (
    <>
      <MIconButton
        href="/"
        variant="outlined"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_name');
          localStorage.removeItem('name');
        }}
      >
        <Hidden lgUp>
          <Icon
            icon={powerFill}
            width={20}
            height={20}
            style={{ color: 'rgb(0, 153, 151)' }}
          />
        </Hidden>

        <Hidden lgDown>
          <Icon
            icon={powerFill}
            width={20}
            height={20}
            style={{ color: '#fff' }}
          />
        </Hidden>
      </MIconButton>
    </>
  );
}

export default Account;
