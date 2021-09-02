import React from 'react';
import { useSelector } from 'react-redux';
import { Form, FormikProvider } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, Grid } from '@material-ui/core';
import { emailError } from 'src/utils/helpError';
import Button from '../../components/Ui/Button';

// ----------------------------------------------------------------------

function ContactForm({ formik }) {
  const { t } = useTranslation();
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const { countries } = useSelector((state) => state.authJwt);
  const { themeDirection } = useSelector((state) => state.settings);

  return (

    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label={t("Name")}
          variant="outlined"
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label={t('Email')}
          variant="outlined"
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
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              sx={{ mb: 3 }}
              select
              fullWidth
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
              name="phone"
              label={t("Mobile")}
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Grid>
        </Grid>
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label={t("Company Name")}
          variant="outlined"
          {...getFieldProps('companyName')}
          error={Boolean(touched.companyName && errors.companyName)}
          helperText={touched.companyName && errors.companyName}
        />
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label={t("Notes")}
          variant="outlined"
          multiline
          rowsMax={4}
          {...getFieldProps('notes')}
          error={Boolean(touched.notes && errors.notes)}
          helperText={touched.notes && errors.notes}
        />
        <Button homeBtn='homeBtn' pending={isSubmitting}>{t("Send")} </Button>
      </Form>
    </FormikProvider>
  );
}

export default ContactForm;
