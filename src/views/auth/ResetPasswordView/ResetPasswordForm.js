import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { Box, TextField } from '@material-ui/core';
import { passwordError } from 'src/utils/helpError';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Ui/Button';

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
