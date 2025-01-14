// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: '',
  app: '/app',
  docs: '/docs'
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/signin'),
    loginUnprotected: path(ROOTS.auth, '/signin-unprotected'),
    register: path(ROOTS.auth, '/signup'),
    registerUnprotected: path(ROOTS.auth, '/signup-unprotected'),
    forgotPassword: path(ROOTS.auth, '/forgot-password'),
    resetPassword: path(ROOTS.auth, '/password-reset'),
    verify: path(ROOTS.auth, '/verify'),
    confirm: path(ROOTS.auth, '/confirm')
  },
  common: {
    prices: path('' ,  '/prices'),
    privacy: path('' ,  '/privacy-policy'),
    terms: path('' ,  '/term-of-use'),
    home: path('' ,  '/'),
    contactUs: path('' ,  '/contact-us'),
    termsView: path('' ,  '/terms-view')
  }
};

export const PATH_HOME = {
  dashboard: ROOTS.app
};

export const PATH_APP = {
  root: ROOTS.app,
  general: {
    root: path(ROOTS.app, '/search'),
    dashboard: path(ROOTS.app, '/dashboard'),
    orders: path(ROOTS.app, '/orders'),
    // market: path(ROOTS.app, '/market'),
    // markerService: path(ROOTS.app, '/market/:service'),
    partSearch: path(ROOTS.app, '/part-search'),
    replacements: path(ROOTS.app, '/replacements'),
    specialOfferUpload: path(ROOTS.app, '/special-offer-upload'),
    catalog: path(ROOTS.app, '/catalog'),
    specialOffer: path(ROOTS.app, '/special-offer'),
    specialOfferDetails: path(ROOTS.app, '/special-offer/:id'),
    quotationsReport: path(ROOTS.app, '/quotations-report'),
    requestFund: path(ROOTS.app, '/request-fund'),
    previousOrders: path(ROOTS.app, '/previous-orders'),
    upgradeSubscription: path(ROOTS.app, '/upgrade-subscription'),
    unactiveUser: path(ROOTS.app, '/unactive'),
    chat: {
      root: path(ROOTS.app, '/chat'),
      new: path(ROOTS.app, '/chat/new'),
      conversation: [
        path(ROOTS.app, '/chat/new'),
        path(ROOTS.app, '/chat/:conversationKey')
      ]
    },
    calendar: path(ROOTS.app, '/calendar')
  },

  management: {
    root: path(ROOTS.app, '/management'),
    user: {
      root: path(ROOTS.app, '/management/user'),
      account: path(ROOTS.app, '/management/user/account')
    },
    // catalog : path(ROOTS.app, '/catalog')
  },
};


