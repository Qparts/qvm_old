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
import WelcomeDialog from 'src/components/Ui/WelcomeDialog'

// Using for Auth (Check doc https://minimals.cc/docs/authentication)
import JwtProvider from 'src/components/Auth/JwtProvider';
// import FirebaseProvider from 'src/components/Auth/FirebaseProvider';

// ----------------------------------------------------------------------

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
      }, 30000);
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
            <WelcomeDialog open={open} handleClose={handleClose} />
          </LocalizationProvider>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
