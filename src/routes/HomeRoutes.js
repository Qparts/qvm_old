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
      path: '/contact-us',
      component: lazy(() => import('src/views/contact'))
    },
    {
      path: '/price',
      component: lazy(() => import('src/views/price'))
    },
    {
      path: '/terms-view',
      component: lazy(() => import('src/views/TermsView'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
