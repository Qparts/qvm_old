import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import { emailError, passwordError } from 'src/utils/helpError';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../../../../components/Ui/TextField';
import CustomButton from '../../../../../components/Ui/Button';

// ----------------------------------------------------------------------

AddUserForm.propTypes = {
  formik: PropTypes.object.isRequired
};

function AddUserForm({ formik, selectedBranch }) {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const { t } = useTranslation();

  const { themeDirection } = useSelector((state) => state.settings);

  const { countries } = useSelector((state) => state.authJwt);

  const { branches } = useSelector((state) => state.branches);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          type='input'
          name="email"
          inputType="email"
          label={t("Email")}
          getField={getFieldProps('email')}
          touched={touched.email || emailError(errors.afterSubmit).error}
          errors={errors.email || emailError(errors.afterSubmit).helperText}
        />

        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField
              type='select'
              id="countryId"
              name="countryId"
              spaceToTop="spaceToTop"
              getField={getFieldProps('countryId')}
            >
              {countries.map((option, index) => (
                <MenuItem key={index} value={option.id}>
                  (+{option.countryCode}) {themeDirection === "rtl" ? option.nameAr : option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={7}>
            <TextField
              type='input'
              inputType="phone"
              name="phone"
              spaceToTop="spaceToTop"
              label={t("Mobile")}
              getField={getFieldProps('phone')}
              touched={touched.phone}
              errors={errors.phone}
            />
          </Grid>
        </Grid>

        <TextField
          type='input'
          spaceToTop="spaceToTop"
          name="name"
          label={t("Name")}
          getField={getFieldProps('name')}
          touched={touched.name}
          errors={errors.name}
        />

        <TextField
          type='select'
          label={t("Branch")}
          id="branch"
          name="branch"
          spaceToTop='spaceToTop'
          disabled={selectedBranch != null}
          getField={getFieldProps('branch')}
          touched={touched.branch}
          errors={errors.branch}
        >
          <MenuItem value="" />
          {branches.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.branchName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type='input'
          spaceToTop="spaceToTop"
          name="password"
          inputType='password'
          label={t("Password")}
          getField={getFieldProps('password')}
          touched={touched.password || passwordError(errors.afterSubmit).error}
          errors={errors.password || passwordError(errors.afterSubmit).helperText}
        />

        {/* <TextField
          type='input'
          inputType='password'
          spaceToTop="spaceToTop"
          label={t("Password")}
          getField={getFieldProps('password')}
          endAdornment={(
            <InputAdornment position="start">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>
            </InputAdornment>
          )}
          touched={touched.password || passwordError(errors.afterSubmit).error}
          errors={errors.password || passwordError(errors.afterSubmit).helperText}
        /> */}

        <Box sx={{ marginTop: '20px' }}>
          <CustomButton type="submit">{t("Create")}</CustomButton>
        </Box>

      </Form>
    </FormikProvider>
  );
}

export default AddUserForm;
