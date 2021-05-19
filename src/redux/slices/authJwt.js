import jwtDecode from 'jwt-decode';
// import axios from 'src/utils/axios';
import axios from 'axios';
import auth from "../../services/authService";
import locationService from "../../services/locationService";


import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  countries: [],
  error: '',
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
      state.countries = action.payload.countries;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
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


    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;

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

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //load countries
      let { data: countries } = await locationService.getCountries();
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const user = localStorage.getItem('loginObject');
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: JSON.parse(user),
            countries: countries
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null,
            countries: countries
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
