// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: '/auth',
  app: '/app',
  docs: '/docs'
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/login'),
    loginUnprotected: path(ROOTS.auth, '/login-unprotected'),
    register: path(ROOTS.auth, '/register'),
    registerUnprotected: path(ROOTS.auth, '/register-unprotected'),
    resetPassword: path(ROOTS.auth, '/reset-password'),
    verify: path(ROOTS.auth, '/verify'),
    confirm: path(ROOTS.auth, '/confirm')
  },
};

export const PATH_HOME = {
  dashboard: ROOTS.app
};

export const PATH_APP = {
  root: ROOTS.app,
  general: {
    root: path(ROOTS.app, '/dashboard'),
    dashboard: path(ROOTS.app, '/dashboard'),
    catalog: path(ROOTS.app, '/management/user'),
  },

  management: {
    root: path(ROOTS.app, '/management'),
    user: {
      root: path(ROOTS.app, '/management/user'),
      profile: path(ROOTS.app, '/management/user/profile'),
      cards: path(ROOTS.app, '/management/user/card'),
      list: path(ROOTS.app, '/management/user/list'),
      account: path(ROOTS.app, '/management/user/account')
    },
  },
};


