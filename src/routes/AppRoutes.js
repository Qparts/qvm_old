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
      path: PATH_APP.general.root,
      component: lazy(() => import('src/views/generalSearch/GeneralSearchView'))
    },
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.general.root} />
    },
    {
      exact: true,
      path: PATH_APP.general.dashboard,
      component: lazy(() => import('src/views/general/DashboardAppView'))
    },
    {
      exact: true,
      path: PATH_APP.general.partSearch,
      component: lazy(() => import('src/views/partSearch/PartSearchView'))
    },
    {
      exact: true,
      path: PATH_APP.general.orders,
      component: lazy(() => import('src/views/orders/OrdersView'))
    },
    // {
    //   exact: true,
    //   path: PATH_APP.general.market,
    //   component: lazy(() => import('src/views/market/MarketView'))
    // },
    // {
    //   exact: true,
    //   path: PATH_APP.general.markerService,
    //   component: lazy(() => import('src/views/market/MarketView'))
    // },
    {
      exact: true,
      path: PATH_APP.general.replacements,
      component: lazy(() => import('src/views/replacements/ReplacementsView'))
    },
    {
      exact: true,
      path: PATH_APP.general.specialOfferUpload,
      component: lazy(() => import('src/views/specialOfferUpload/SpecialOfferUploadView'))
    },

    {
      exact: true,
      path: PATH_APP.general.catalog,
      component: lazy(() => import('src/views/catalog/CatalogView'))
    },
    {
      exact: true,
      path: PATH_APP.general.specialOffer,
      component: lazy(() => import('src/views/specialOffer/SpecialOfferView'))
    },
    {
      exact: true,
      path: PATH_APP.general.specialOfferDetails,
      component: lazy(() => import('src/views/specialOffer/SpecialOfferView'))
    },
    {
      exact: true,
      path: PATH_APP.general.quotationsReport,
      component: lazy(() => import('src/views/quotationsReport/QuotationsReportView'))
    },
    {
      exact: true,
      path: PATH_APP.general.requestFund,
      component: lazy(() => import('src/views/requestFund/RequestFundView'))
    },
    {
      exact: true,
      path: PATH_APP.general.upgradeSubscription,
      component: lazy(() => import('src/views/upgradeSubscription/UpgradeSubscriptionView'))
    },
    {
      exact: true,
      path: PATH_APP.general.unactiveUser,
      component: lazy(() => import('src/views/upgradeSubscription/UpgradeSubscriptionView/UnActiveUser'))
    },
    {
      exact: true,
      path: PATH_APP.general.chat.conversation,
      component: lazy(() => import('src/views/orders/OrdersView'))
    },
    {
      exact: true,
      path: PATH_APP.general.previousOrders,
      component: lazy(() => import('src/views/previousOrders/PreviousOrdersView'))
    },
    {
      exact: true,
      path: PATH_APP.general.chat.root,
      component: () => <Redirect to={PATH_APP.general.chat.new} />
    },



    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.management.user.account,
      component: lazy(() => import('src/views/user/AccountView'))
    },

    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;
