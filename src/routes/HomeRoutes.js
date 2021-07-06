import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from 'src/layouts/HomeLayout';

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: lazy(() => import('src/views/home/LandingPageView'))
    },
    {
      path: '/contactus',
      component: lazy(() => import('src/views/contact'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
