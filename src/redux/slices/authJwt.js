import jwtDecode from 'jwt-decode';
import axios from 'axios';
import auth from "../../services/authService";
import locationService from "../../services/locationService";


import { createSlice } from '@reduxjs/toolkit';
import settingService from 'src/services/settingService';
import paymentService from 'src/services/paymentService';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  loginObject: null,
  countries: [],
  error: '',
  availablePlans: [],
  currentPlan: null,
  premiumPlan: null,
  planFeatures: [],
  validResetToken: false
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.loginObject = action.payload.user;
      state.countries = action.payload.countries;
      state.currentPlan = action.payload.currentPlan;
      state.planFeatures = action.payload.planFeatures;
      state.availablePlans = action.payload.availablePlans;
      state.premiumPlan = action.payload.premiumPlan;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loginObject = action.payload.user;
      state.error = ''
    },
    loginFail(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload
    },
    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = false;
      // state.user = action.payload.user;
      state.error = ''
    },

    registerFail(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // REGISTER
    verifySuccess(state, action) {
      state.isAuthenticated = false;
      state.error = ''
    },

    verifyFail(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    // resetPassword
    forgotPasswordSuccess(state, action) {
      state.error = ''
    },

    forgotPasswordFail(state, action) {
      state.error = action.payload;
    },

    // validate reset token
    validateResetTokenSuccess(state, action) {
      state.error = '';
      state.validResetToken = true
    },

    validateResetTokenFail(state, action) {
      state.error = action.payload;
      state.validResetToken = false
    },

    // validate reset token
    resetPasswordSuccess(state, action) {
      state.error = '';
    },

    resetPasswordFail(state, action) {
      state.error = action.payload;
    },

    updateLoginObject(state, action) {
      state.loginObject = action.payload.loginObject;
      state.user = action.payload.loginObject;
      localStorage.setItem("loginObject", JSON.stringify(action.payload.loginObject));
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loginObject = null;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// Actions
export const {
  updateLoginObject,
} = slice.actions;

// ----------------------------------------------------------------------


const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};


// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await auth.login(email, password);
      const { jwt: accessToken } = response.data;
      const user = response.data;
      setSession(accessToken);
      localStorage.setItem('loginObject', JSON.stringify(user));
      dispatch(slice.actions.loginSuccess({ user }));
    } catch (error) {
      dispatch(slice.actions.loginFail(error.response.data));
    }

  };
}

// ----------------------------------------------------------------------

export function register({ email, password, mobile, companyName, name, countryId, regionId, cityId }) {
  return async (dispatch) => {
    try {
      const response = await auth.signup({
        email, password, mobile, companyName, name, countryId, regionId, cityId
      });
      // const { accessToken, user } = response.data;

      // window.localStorage.setItem('accessToken', accessToken);
      dispatch(slice.actions.registerSuccess());
    } catch (error) {
      dispatch(slice.actions.registerFail(error.response.data));
    }

  };
}



// ----------------------------------------------------------------------

export function verify({ email, code }) {
  return async (dispatch) => {
    try {
      const response = await auth.
        signupVerify({
          code: code,
          email: email
        });
      console.log("response", response);
      dispatch(slice.actions.verifySuccess());
    } catch (error) {
      dispatch(slice.actions.verifyFail(error.response.data));
    }
  }
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    localStorage.removeItem("loginObject");
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function forgotPassword(email) {
  return async (dispatch) => {
    try {
      await auth.forgetPassword({
        email, email
      });
      dispatch(slice.actions.forgotPasswordSuccess());
    } catch (error) {
      dispatch(slice.actions.forgotPasswordFail(error.response.data));
    }

  };
}

// ----------------------------------------------------------------------

export function validateResetToken(token) {
  return async (dispatch) => {
    try {
      await auth.validatePasswordResetToken(token);
      dispatch(slice.actions.validateResetTokenSuccess());
    } catch (error) {
      dispatch(slice.actions.validateResetTokenFail(error.response.data));
    }

  };
}

// ----------------------------------------------------------------------

export function resetPassword({ code, newPassword }) {
  return async (dispatch) => {
    try {
      await auth.resetPassword({ code, newPassword });
      dispatch(slice.actions.resetPasswordSuccess());
    } catch (error) {
      dispatch(slice.actions.resetPasswordFail(error.response.data));
    }

  };
}


// ----------------------------------------------------------------------

export function refreshToken() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const loginUser = JSON.parse(localStorage.getItem("loginObject"));
      const refreshJwt = loginUser.refreshJwt;
      const token = loginUser.jwt;
      const { data: loginObject } = await settingService.refreshToken(
        token,
        refreshJwt
      );
      loginObject.refreshJwt = refreshJwt;
      dispatch(slice.actions.updateLoginObject({ loginObject: loginObject }));
    } catch (error) {
      dispatch(slice.actions.resetPasswordFail(error?.response?.data));
    }

  };
}


// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let { data: countries } = await locationService.getCountries();
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const { data: plans } = await paymentService.getPlans();
        const { data: planFeatures } = await paymentService.getPlansFeatures();
        const loginObject = JSON.parse(localStorage.getItem('loginObject'));
        let currentPlan = getCurrentPlan(plans, loginObject.company.subscriptions[0]);
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: loginObject,
            loginObject: loginObject,
            countries: countries,
            currentPlan: currentPlan,
            planFeatures: planFeatures,
            availablePlans: plans,
            premiumPlan: plans.find(e => e.name == 'Premium Plan')
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null,
            loginObject: null,
            countries: countries,
            currentPlan: null,
            planFeatures: [],
            availablePlans: [],
          })
        );
      }
    } catch (error) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null,
          currentPlan: null,
          planFeatures: [],
          availablePlans: []
        })
      );
    }
  };
}

// ----------------------------------------------------------------------


const getCurrentPlan = (plans, plan) => {
  let currentPlan = null;
  if (plans && plans.length > 0) {
    currentPlan = plans[0];
    if (plan.status == 'A') {
      for (let p of plans) {
        if (p.id == plan.planId) {
          currentPlan = p;
          currentPlan.status = plan.status;
          return currentPlan;
        }
      }
    }
    else {
      currentPlan.status = plan.status;
      return currentPlan;
    }
  }
  return currentPlan;
}
