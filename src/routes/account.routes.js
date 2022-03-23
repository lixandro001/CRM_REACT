import { PATH_PROFILE } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';

// ----------------------------------------------------------------------

const AccountRoutes = {
  path: PATH_PROFILE.root,
  layout: DashboardLayout,
  routes: [
    // Config
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_PROFILE.profile.account,
      component: lazy(() => import('src/views/Account'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AccountRoutes;
