import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { Box, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { passwordError } from 'src/utils/helpError';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Ui/Button';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  formik: PropTypes.object.isRequired
};

// ----------------------------------------------------------------------

function ResetPasswordForm({ formik }) {
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          {...getFieldProps('password')}
          label={t("New Password")}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }

          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            homeBtn='homeBtn'
            pending={isSubmitting}
          >
            {t("Reset Password")}
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default ResetPasswordForm;
