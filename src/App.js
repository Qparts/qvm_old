import React, { useEffect, useState } from 'react';
import { ThemeConfig } from './theme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { store, persistor } from './redux/store';
import routes, { renderRoutes } from 'src/routes';
import ScrollToTop from 'src/components/ScrollToTop';
import LoadingScreen from 'src/components/LoadingScreen';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import NotistackProvider from 'src/components/NotistackProvider';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import QstockDialog from 'src/components/Ui/QstockDialog';

// Using for Auth (Check doc https://minimals.cc/docs/authentication)
import JwtProvider from 'src/components/Auth/JwtProvider';
// import FirebaseProvider from 'src/components/Auth/FirebaseProvider';
import ReactGA from 'react-ga4';
// ----------------------------------------------------------------------

if (process.env.REACT_APP_ENV === 'prod') {
  ReactGA.initialize('G-N6Y4FR8EYZ');
  ReactGA.send('pageview');
}

const history = createBrowserHistory();

function App() {
  const popUp = JSON.parse(localStorage.getItem('popUp'));
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let delay;
    if (!popUp) {
      delay = setTimeout(() => {
        setOpen(true);
        localStorage.setItem('popUp', JSON.stringify(1));
      }, 20000);
    }
    return () => clearTimeout(delay);
  }, [popUp]);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeConfig>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NotistackProvider>
              <Router history={history}>
                <JwtProvider>
                  <ScrollToTop />
                  {renderRoutes(routes)}
                </JwtProvider>
              </Router>
            </NotistackProvider>
            <QstockDialog open={open} handleClose={handleClose} />
          </LocalizationProvider>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
