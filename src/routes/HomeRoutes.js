import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from 'src/layouts/HomeLayout';
import { PATH_PAGE } from './paths';

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: PATH_PAGE.common.home,
      component: lazy(() => import('src/views/home/LandingPageView'))
    },
    {
      path: PATH_PAGE.common.contactUs,
      component: lazy(() => import('src/views/contact'))
    },
    {
      path: PATH_PAGE.common.prices,
      component: lazy(() => import('src/views/price'))
    },
    {
      path: PATH_PAGE.common.termsView,
      component: lazy(() => import('src/views/TermsView'))
    },
    {
      path: PATH_PAGE.common.privacy,
      component: lazy(() => import('src/views/PrivacyPolicy'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
