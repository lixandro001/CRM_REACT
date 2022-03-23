import { PATH_PROMOTER } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
// ----------------------------------------------------------------------

const PromoterRoutes = {
  path: PATH_PROMOTER.root,
  layout: DashboardLayout,
  routes: [
    // Config
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_PROMOTER.promoter.detailCommission,
      component: lazy(() => import('src/views/Promoter/Commissions'))
    },
    {
      exact: true,
      path: PATH_PROMOTER.promoter.dashboardCommission,
      component: lazy(() => import('src/views/Promoter/DashboardPromoter'))
    },
    {
      exact: true,
      path: PATH_PROMOTER.promoter.portfolioCommission,
      component: lazy(() => import('src/views/Promoter/Portfolio'))
    },
    {
      exact: true,
      path: PATH_PROMOTER.promoter.doctorsCommission,
      component: lazy(() => import('src/views/Promoter/Doctors'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default PromoterRoutes;
