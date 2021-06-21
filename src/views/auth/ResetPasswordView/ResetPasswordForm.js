import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { emailError } from 'src/utils/helpError';
import { Box, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { passwordError } from 'src/utils/helpError';
import { useTranslation } from 'react-i18next';


// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  formik: PropTypes.object.isRequired
};

// ----------------------------------------------------------------------

function ResetPasswordForm({ formik }) {
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const { t } = useTranslation();

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
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
        />
        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            {t("Reset Password")}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default ResetPasswordForm;
