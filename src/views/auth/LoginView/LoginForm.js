import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { PATH_PAGE } from 'src/routes/paths';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { passwordError, emailError } from 'src/utils/helpError';
import {
  Box,
  Link,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import Button from '../../../components/Ui/Button';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

LoginForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function LoginForm({ formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  const { t } = useTranslation();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate >
        <TextField
          fullWidth
          required
          type="email"
          label={t("Email Address")}
          {...getFieldProps('email')}
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          required
          type={showPassword ? 'text' : 'password'}
          label={t("Password")}
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }
        />
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label={t("Remember me")}
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to={PATH_PAGE.auth.forgotPassword}
          >
            {t("Forgot Password?")}
          </Link>
        </Box>

        <Button
          // type="submit"
          onClick={handleSubmit}
          homeBtn='homeBtn'
          pending={isSubmitting}
        >
          {t("Login")}
        </Button>

      </Form>
    </FormikProvider>
  );
}

export default LoginForm;
