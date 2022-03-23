import { PATH_SUPERVISOR } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';

// ----------------------------------------------------------------------

const SupervisorRoutes = {
  path: PATH_SUPERVISOR.root,
  layout: DashboardLayout,
  routes: [
    // Config
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_SUPERVISOR.supervisor.detailCommission,
      component: lazy(() =>
        import('src/views/Supervisor/CommissionsSupervisor')
      )
    },
    {
      exact: true,
      path: PATH_SUPERVISOR.supervisor.dashboardCommission,
      component: lazy(() => import('src/views/Supervisor/DashboardSupervisor'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default SupervisorRoutes;
