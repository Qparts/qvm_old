import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { emailError, passwordError } from 'src/utils/helpError';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from "@material-ui/core";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { cleanup } from 'src/redux/slices/branches';

// ----------------------------------------------------------------------

AddUserForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function AddUserForm({ formik, closePopup, selectedBranch, setSelectedBranch }) {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { themeDirection } = useSelector((state) => state.settings);

  const { countries } = useSelector(
    (state) => state.authJwt
  );

  const { branches } = useSelector(
    (state) => state.branches
  );




  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
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

        <Grid container spacing={4}>
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
                  (+{country.countryCode}) {themeDirection === "rtl" ? country.nameAr : country.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={7}>

            <TextField
              fullWidth
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
          name="name"
          label={t("Name")}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />

        <Box sx={{ mb: 3 }} />

        <TextField
          select
          fullWidth
          label={t("Branch")}
          placeholder={t("Branch")}
          // defaultValue={selectedBranch ? selectedBranch.id : 0}
          disabled={selectedBranch != null}
          {...getFieldProps('branch')}
          SelectProps={{ native: true }}
          error={Boolean(touched.branch && errors.branch)}
          helperText={touched.branch && errors.branch}
        >
          <option value="" />
          {branches.map((option) => (
            <option key={option.id} value={option.id}>
              {option.branchName}
            </option>
          ))}
        </TextField>


        <Box sx={{ mb: 3 }} />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label={t("Password")}
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
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

          <div className="row">

            <div className="col-md-6">
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                pending={isSubmitting}
              >
                {t("Create")}
              </LoadingButton>
            </div>

            <div className="col-md-6">
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                pending={isSubmitting}
                onClick={() => {
                  dispatch(cleanup());
                  if (setSelectedBranch)
                    setSelectedBranch(null);
                  closePopup(false)
                }}
              >
                {t("Cancel")}
              </LoadingButton>

            </div>

          </div>
        </Box>

      </Form>
    </FormikProvider>
  );
}

export default AddUserForm;
