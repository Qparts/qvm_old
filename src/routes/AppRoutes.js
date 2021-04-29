import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from 'src/components/Auth/AuthProtect';
import DashboardLayout from 'src/layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.general.dashboard,
      component: lazy(() => import('src/views/general/DashboardAppView'))
    },
  
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.general.root} />
    },


    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.management.user.profile,
      component: lazy(() => import('src/views/user/ProfileView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.cards,
      component: lazy(() => import('src/views/user/UserCardsView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.list,
      component: lazy(() => import('src/views/user/UserListView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.account,
      component: lazy(() => import('src/views/user/AccountView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },
    {
      exact: true,
      path: PATH_APP.management.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },


    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;
