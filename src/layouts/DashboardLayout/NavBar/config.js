import React from 'react';
import { Icon } from '@iconify/react';
// import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import homeFill from '@iconify-icons/eva/home-fill';
import { Catalog, Offer, SettingsIcon, Chart, Dashboard, Orders, Company } from '../../../icons/icons';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const navConfig = [
  {
    items: [
      {
        title: 'home',
        icon: <Icon icon={homeFill} color='#a2b4bd' style={{ fontSize: '26px' }} />,
        href: PATH_APP.general.root,
        notification: false
      },
    ]
  },
  {
    items: [
      {
        title: 'replacements',
        icon: <SettingsIcon width='26' height='26' fill='#a2b4bd' />,
        href: PATH_APP.general.replacements,
        notification: false
      },
    ]
  },
  {
    items: [
      {
        icon: <Dashboard width='26' height='26' fill='#a2b4bd' />,
        title: 'dashboard',
        href: PATH_APP.general.dashboard,
        notification: false
      }
    ]
  },
  {
    items: [
      {
        title: 'orders',
        icon: <Orders width='26' height='26' fill='#a2b4bd' fillArr='#F20505' />,
        href: PATH_APP.general.chat.root,
        notification: true
      },
    ]
  },
  {
    items: [
      {
        title: 'Previous Orders',
        icon: <Orders width='26' height='26' fill='#a2b4bd' fillArr='#F20505' />,
        href: PATH_APP.general.previousOrders,
        notification: true
      },
    ]
  },
  // {
  //   items: [
  //     {
  //       title: 'market',
  //       icon: <Icon icon={roundAddShoppingCart} color='#a2b4bd' style={{fontSize: '26px'}} />,
  //       href: PATH_APP.general.market,
  //     },
  //   ]
  // },
  {
    items: [
      {
        title: 'reports',
        icon: <Chart width='26' height='26' fill='#a2b4bd' />,
        href: PATH_APP.general.quotationsReport,
        notification: false
        // notification: true
      },
    ]
  },
  {
    items: [
      {
        title: 'offers',
        icon: <Offer width='26' height='26' fill='#a2b4bd' />,
        href: PATH_APP.general.specialOffer,
        notification: false
        // notification: true
      },
    ]
  },
  {
    items: [
      {
        title: 'catalog',
        icon: <Catalog width='26' height='26' fill='#a2b4bd' />,
        href: PATH_APP.general.catalog,
        notification: false
      },
    ]
  },
  {
    items: [
      {
        title: 'Fund',
        icon: <Company width='26' height='26' fill='#a2b4bd' />,
        href: PATH_APP.general.requestFund,
        notification: false
      },
    ]
  },
];

export default navConfig;
