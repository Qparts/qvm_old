import React from 'react';
import { Icon } from '@iconify/react';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import homeFill from '@iconify-icons/eva/home-fill';
import { Catalog, LogoutIcon, Offer, SettingsIcon, Chart, Dashboard, Orders } from '../../../icons/icons';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

const navConfig = [
  {
    items: [
      {
        title: 'home',
        icon: <Icon icon={homeFill} color='#a2b4bd' style={{fontSize: '32px'}} />,
        href: PATH_APP.general.root,
      },

    ]
  },
  {
    items: [
      {
        icon: <Dashboard width='32' height='32' fill='#a2b4bd' />,
        title: 'dashboard',
        href: PATH_APP.general.dashboard
      }
    ]
  },
  {
    items: [
      {
        title: 'orders',
        icon: <Orders width='32' height='32' fill='#a2b4bd' fillArr='#F20505' />,
        href: PATH_APP.general.orders,
        notification: true
      },

    ]
  },
  {
    items: [
      {
        title: 'market',
        icon: <Icon icon={roundAddShoppingCart} color='#a2b4bd' style={{fontSize: '32px'}} />,
        href: PATH_APP.general.market,
      },
    ]
  },
  {
    items: [
      {
        title: 'reports',
        icon: <Chart width='32' height='32' fill='#a2b4bd' />,
        href: PATH_APP.general.quotationsReport,
        notification: true
      },

    ]
  },
  {
    items: [
      {
        title: 'offers',
        icon: <Offer width='32' height='32' fill='#a2b4bd' />,
        href: PATH_APP.general.specialOffer,
        notification: true
      },

    ]
  },
  {
    items: [
      {
        title: 'catalog',
        icon: <Catalog width='32' height='32' fill='#a2b4bd' />,
        href: PATH_APP.general.catalog,
      },

    ]
  },
  {
    items: [
      {
        title: 'replacements',
        icon: <SettingsIcon width='32' height='32' fill='#a2b4bd' />,
        href: PATH_APP.general.replacements,
      },

    ]
  },
  {
    items: [
      {
        icon: <LogoutIcon width='32' height='32' fill='#a2b4bd' />,
        href: PATH_PAGE.auth.login,
        logoutAttr: 'logout',
      },

    ]
  },
];

export default navConfig;
