import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
//
// import HomeNavbar from './HomeNavbar';
import Footer from './Footer';

// ----------------------------------------------------------------------

HomeLayout.propTypes = {
  children: PropTypes.node
};

export default function HomeLayout({ children }) {
  return (
    <Box sx={{ height: '100%' }}>
      {/* <HomeNavbar /> */}
      <Box sx={{ height: '100%' }}>
        {children}
        <Footer />;
      </Box>
    </Box>
  );
}
