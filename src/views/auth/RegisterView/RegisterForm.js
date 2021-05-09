import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { emailError, passwordError } from 'src/utils/helpError';
import { useSelector } from 'react-redux';
import { Select, MenuItem } from "@material-ui/core";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  NativeSelect
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

RegisterForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function RegisterForm({ formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const { countries } = useSelector(
    (state) => state.authJwt
  );




  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <TextField
          fullWidth
          name="email"
          label="Company Name"
          {...getFieldProps('companyName')}
          error={Boolean(touched.companyName && errors.companyName)}
          helperText={touched.companyName && errors.companyName}
        />

        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email address"
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

        <Grid container spacing={2}>
          <Grid item xs={5} >
            <Select
              labelId="countryId"
              id="countryId"
              name="countryId"
              {...getFieldProps('countryId')}
            >
              {countries.map((country) => (
                <MenuItem
                  key={country.id}
                  value={country.id}
                >
                  (+{country.countryCode}) {document.body.dir === "rtl" ? country.nameAr : country.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={7}>

            <TextField
              fullWidth
              name="phone"
              label="Phone"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Grid>

        </Grid>


        <Box sx={{ mb: 3 }} />

        <TextField
          fullWidth
          name="name"
          label="Name"
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />

        <Box sx={{ mb: 3 }} />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password"
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
        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Register
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default RegisterForm;
