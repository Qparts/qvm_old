import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { emailError, passwordError } from 'src/utils/helpError';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Link
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Ui/Button';

// ----------------------------------------------------------------------

RegisterForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function RegisterForm({ formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const { t } = useTranslation();
  const { countries } = useSelector((state) => state.authJwt);
  const { themeDirection } = useSelector((state) => state.settings);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <TextField
          fullWidth
          required
          name="email"
          label={t("Company Name")}
          {...getFieldProps('companyName')}
          error={Boolean(touched.companyName && errors.companyName)}
          helperText={touched.companyName && errors.companyName}
        />

        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          required
          name="email"
          type="email"
          label={t("Email")}
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

        <Grid container >
          <Grid item xs={5} >
            <TextField
              style={{ paddingInlineEnd: 10 }}
              select
              id="countryId"
              name="countryId"
              {...getFieldProps('countryId')}
              SelectProps={{ native: true }}
            >
              {countries.map((option, index) => (
                <option key={index} value={option.id}>
                  (+{option.countryCode}) {themeDirection === "rtl" ? option.nameAr : option.name}
                </option>
              ))}
            </TextField>

          </Grid>

          <Grid item xs={7}>

            <TextField
              fullWidth
              required
              name="phone"
              label={t("Mobile")}
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Grid>

        </Grid>


        <Box sx={{ mb: 3 }} />

        <TextField
          fullWidth
          required
          name="name"
          label={t("Name")}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
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
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
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
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary', mt: 3 }}
        >
          {t("By registering you agree on QVM  and QVM")}&nbsp;
          <Link underline="always" sx={{ color: 'text.primary' }}>
            {t("Terms of Use")}
          </Link>
          &nbsp;{t("and QVM")}&nbsp;
          <Link underline="always" sx={{ color: 'text.primary' }}>
            {t("Privacy Policy")}
          </Link>
          .
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            homeBtn='homeBtn'
            pending={isSubmitting}
          >
            {t("Signup")}
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default RegisterForm;
