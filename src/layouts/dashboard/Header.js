import React from 'react';
import { Icon } from '@iconify/react';
import powerFill from '@iconify-icons/eva/power-fill';
import { MIconButton } from '../../components/@material-extend';
import AccountPopover from './AccountPopover';
import PropTypes from 'prop-types';
import { Box, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import Logo from '../../components/Logo';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------
Header.propTypes = {
  onOpenSidebar: PropTypes.func
};

function Header({ onOpenSidebar }) {
  return (
    <div
      className="hola"
      style={{
        height: '70px',
        width: '100%',
        position: 'fixed',
        zIndex: 10000,
        background: ' #009997',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 15px'
      }}
    >
      <RouterLink
        to="/"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Logo />
      </RouterLink>

      <Hidden lgUp>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: '#ffffff' }}>
          <Icon icon={menu2Fill} />
        </IconButton>
      </Hidden>

      <Hidden lgDown>
        <AccountPopover />
      </Hidden>
    </div>
  );
}

export default Header;
