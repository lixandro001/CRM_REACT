// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_PROFILE = '/user';
const ROOTS_PROMOTER = '/promoter';
const ROOTS_SUPERVISOR = '/supervisor';

// ----------------------------------------------------------------------

export const PATH_HOME = {
  urlEmpresa: 'https://www.suizalab.com',
  cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  purchase: 'https://material-ui.com/store/items/minimal-dashboard/',
  dashboard: '/'
};

export const PATH_PROFILE = {
  root: ROOTS_PROFILE,
  profile: {
    account: path(ROOTS_PROFILE, '/profile')
  }
};

export const PATH_PROMOTER = {
  root: ROOTS_PROMOTER,
  promoter: {
    detailCommission: path(ROOTS_PROMOTER, '/commissions'),
    dashboardCommission: path(ROOTS_PROMOTER, '/dashboard'),
    portfolioCommission: path(ROOTS_PROMOTER, '/portfolio'),
    doctorsCommission: path(ROOTS_PROMOTER, '/doctors')
  }
};

export const PATH_SUPERVISOR = {
  root: ROOTS_SUPERVISOR,
  supervisor: {
    detailCommission: path(ROOTS_SUPERVISOR, '/commissions'),
    dashboardCommission: path(ROOTS_SUPERVISOR, '/dashboard')
  }
};
