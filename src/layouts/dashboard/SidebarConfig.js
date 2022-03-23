// routes
import { PATH_SUPERVISOR, PATH_PROMOTER } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  page: getIcon('ic_page'),
  dashboard: getIcon('ic_dashboard'),
  commission: getIcon('ic_commission'),
  cartera: getIcon('ic_cartera'),
  doctor: getIcon('ic_user')
};

const sidebarConfig = [
  //ADMINISTRADOR
  // ----------------------------------------------------------------------
  {
    subheader: 'ADMINISTRADOR',
    Authorization: 'ADMINISTRADOR',
    items: [
      {
        title: 'Dashboard',
        validate: false,
        modality: '01',
        href: PATH_PROMOTER.promoter.dashboardCommission,
        icon: ICONS.dashboard
      },
      {
        title: 'Categoria',
        validate: false,
        modality: '02',
        href: PATH_PROMOTER.promoter.detailCommission,
        icon: ICONS.commission
      },
      {
        title: 'Articulos',
        validate: false,
        modality: '03',
        href: PATH_PROMOTER.promoter.portfolioCommission,
        icon: ICONS.cartera
      },
      {
        title: 'Proveedor',
        validate: false,
        modality: '04',
        href: PATH_PROMOTER.promoter.doctorsCommission,
        icon: ICONS.doctor
      }
    ]
  },

  // CAJERO
  // ---------------------------------------------------------------------------------
  {
    subheader: 'CAJERO',
    Authorization: 'CAJERO',
    items: [
      {
        title: 'VENTAS',
        validate: false,
        modality: '',
        href: PATH_SUPERVISOR.supervisor.dashboardCommission,
        icon: ICONS.dashboard
      },
      {
        title: 'PRODUCTOS',
        validate: false,
        modality: '',
        href: PATH_SUPERVISOR.supervisor.detailCommission,
        icon: ICONS.commission
      }
    ]
  }
];

export default sidebarConfig;
