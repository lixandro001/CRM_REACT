import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SnackbarProvider } from 'notistack';
import Zoom from '@material-ui/core/Zoom';
// routes
import routes, { renderRoutes } from './routes';
// redux
import { store, persistor } from './redux/store';
// theme
import ThemeConfig from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';

// ----------------------------------------------------------------------

const history = createBrowserHistory();

export default function App() {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          style={{ zIndex: '100000' }}
          TransitionComponent={Zoom}
          preventDuplicate
        >
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <ThemeConfig>
              <RtlLayout>
                <Router history={history}>
                  <Settings />
                  <ScrollToTop />
                  {renderRoutes(routes)}
                </Router>
              </RtlLayout>
            </ThemeConfig>
          </PersistGate>
        </SnackbarProvider>
      </ReduxProvider>
    </HelmetProvider>
  );
}
