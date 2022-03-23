import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  backgroundColor: '#009788',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
    // minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle style={{ zIndex: 0 }}>
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: '#ffffff' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *:not(:first-of-type)': {
              ml: { xs: 0.5, sm: 2, lg: 3 }
            }
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
