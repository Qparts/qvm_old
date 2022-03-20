import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import { Redirect } from 'react-router-dom';
import { PATH_PAGE } from 'src/routes/paths';
import { PATH_APP } from 'src/routes/paths';
import LoadingScreen from 'src/components/LoadingScreen';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children }) {
  const { pathname } = useLocation();
  const { isLoading, isAuthenticated } = useAuth();
  const loginObject  = JSON.parse(localStorage.getItem('loginObject'))

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect to={PATH_PAGE.auth.login} />;
  }

  if (!loginObject?.subscriber.admin && !loginObject?.subscriber.active  && !pathname.includes('app/unactive')) {
    return <Redirect to={PATH_APP.general.unactiveUser} />
  }

  return <>{children}</>;
}

export default AuthProtect;
