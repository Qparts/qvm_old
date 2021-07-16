import React from 'react';
import { Add, Catalog, LogoutIcon, Offer, SettingsIcon, Chart, Dashboard, Orders } from '../../../icons/icons';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const navConfig = [
  {
    items: [
      {
        icon: <Dashboard width='32' height='32' fill='#a2b4bd' />,
        title: 'home',
        href: PATH_APP.general.root
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
        icon: <Orders width='32' height='32' fill='#a2b4bd' fillArr='#F20505' />,
        href: PATH_APP.general.market,
        notification: true
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
        title: 'advertise',
        icon: <Add width='32' height='32' fill='#a2b4bd' />,
        href: PATH_APP.general.partSearch,
      },

    ]
  },
  {
    items: [
      {
        icon: <LogoutIcon width='32' height='32' fill='#a2b4bd' />,
        href: PATH_APP.general.quotationsReport,
      },

    ]
  },
];

export default navConfig;
