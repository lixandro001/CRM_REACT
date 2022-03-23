import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
// material
import {
  alpha,
  experimentalStyled as styled,
  makeStyles
} from '@material-ui/core/styles';

import {
  Box,
  Link,
  List,
  Avatar,
  Drawer,
  Hidden,
  Typography,
  ListSubheader
} from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
//
import MenuLinks from './SidebarConfig';
import SidebarItem from './SidebarItem';
import AccountPopover from './AccountPopover';

// ----------REDUX-----------------------
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------
console.log('=========MenuLinks===============');
console.log(MenuLinks);
console.log('====================================');
const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    drawer: {
      [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
      }
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: theme.palette.background.default
    },
    subHeader: {
      ...theme.typography.overline,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      color: theme.palette.text.primary
    },
    account: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2, 2.5),
      margin: theme.spacing(1, 2.5, 5),
      borderRadius: theme.shape.borderRadiusSm,
      background: theme.palette.grey[isLight ? 200 : 800],
      flexDirection: 'column',
      minHeight: 'fit-content',
      textAlign: 'center'
    },
    avatar: {
      width: 120,
      height: 120,
      border: '1px solid gray'
    },
    logo: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '0px',
      paddingBottom: '0px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  };
});

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(1, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.primary.main, 0.08)
      : theme.palette.primary.lighter,
  flexDirection: 'column',
  minHeight: 'fit-content',
  textAlign: 'center'
}));

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level, modality }) {
  const key = item.href + level;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    console.log('MENU MAS DE DOS NIVELES');

    array = [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </SidebarItem>
    ];
  } else {
    console.log('MENU DE UN NIVEL');
    console.log(item);
    console.log(modality);
    if (item.validate) {
      console.log(item.modality);
      if (item.modality === modality) {
        array = [
          ...array,
          <SidebarItem
            key={key}
            level={level}
            href={item.href}
            icon={item.icon}
            info={item.info}
            title={item.title}
          />
        ];
      }
    } else {
      array = [
        ...array,
        <SidebarItem
          key={key}
          level={level}
          href={item.href}
          icon={item.icon}
          info={item.info}
          title={item.title}
        />
      ];
    }
  }
  return array;
}

function renderSidebarItems({ items, pathname, modality, level = 0 }) {
  console.log('NUMERO DE MODALIDAD');
  console.log(modality);
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) =>
          reduceChild({ array, item, pathname, level, modality }),
        []
      )}
    </List>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const classes = useStyles();
  const { username } = useSelector((state) => state.auth);
  const [modality, setModality] = useState('');
  console.log('nombre de usernamr');
  console.log(username.data);

  useEffect(() => {
    if (username.data) {
      setModality(username.data.modality);
    }
  }, [username]);

  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = !_.isNil(username.data) ? (
    <Scrollbar>
      <Box
        sx={{ px: 2.5, py: 3 }}
        style={{ height: '70px', backgroundColor: '#009788', zIndex: 0 }}
        className={classes.logo}
      >
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Box>

      <Link underline="none" component={RouterLink} to="/user/profile">
        <AccountStyle>
          {username.data &&
            (username.data.sex === 'Femenino' ? (
              <Avatar
                alt="My Avatar"
                className={classes.avatar}
                src="/static/illustrations/profileMan.svg"
              />
            ) : (
              <Avatar
                alt="My Avatar"
                className={classes.avatar}
                src="/static/illustrations/profileWoman.svg"
              />
            ))}
          {username.data && (
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {username.data.nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {username.data.numero_documento}
              </Typography>
            </Box>
          )}
        </AccountStyle>
      </Link>

      {_.filter(MenuLinks, { Authorization: username.data.tipo_rol }).map(
        (list) => (
          <List
            disablePadding
            key={list.subheader}
            subheader={
              <ListSubheader
                disableSticky
                disableGutters
                sx={{
                  mt: 3,
                  mb: 2,
                  pl: 5,
                  color: 'text.primary',
                  typography: 'overline'
                }}
              >
                {list.subheader}
              </ListSubheader>
            }
          >
            {renderSidebarItems({
              items: list.items,
              pathname,
              modality
            })}
          </List>
        )
      )}
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', padding: 2 }}>
        {/* <img src="/static/brand/logo_whatsapp.svg" alt="login" /> */}
        {/* <img src="/static/brand/LogoSuiza.svg" alt="logoSuiza" /> */}
      </Box>

      <Hidden lgUp>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <AccountPopover
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Hidden>
    </Scrollbar>
  ) : (
    ''
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {!_.isNil(username.data) && renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {!_.isNil(username.data) && renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
