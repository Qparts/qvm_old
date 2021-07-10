import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, verify, forgotPassword, validateResetToken, resetPassword } from 'src/redux/slices/authJwt';

// ----------------------------------------------------------------------

useAuth.propTypes = {
  method: PropTypes.oneOf(['jwt', 'firebase'])
};

export default function useAuth(method = 'jwt') {

  // JWT Auth
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.authJwt
  );

  // JWT Auth
  if (method === 'jwt') {
    return {
      method: 'jwt',
      user: user,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,

      login: ({ email, password }) =>
        dispatch(
          login({
            email: email,
            password: password
          })
        ),

      register: ({ email, password, mobile, companyName, name, countryId }) => {
        dispatch(
          register({
            email: email,
            password: password,
            mobile: mobile,
            companyName: companyName,
            name: name,
            countryId: countryId,
            regionId: "1",
            cityId: "1",
          })
        );

      }
      ,

      verify: ({ email, code }) => dispatch(
        verify({ email, code })
      ),

      logout: () => dispatch(logout()),

      forgotPassword: (email) => dispatch(
        forgotPassword(email)
      ),

      validateResetToken: (token) => dispatch(
        validateResetToken(token)
      ),

      resetPassword: ({ code, newPassword }) => dispatch(
        resetPassword({ code, newPassword })
      ),

      updateProfile: () => { }
    };
  }

}
