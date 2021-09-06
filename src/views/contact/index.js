import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import ContactForm from './ContactForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Alert, Card, Typography } from '@material-ui/core';
import helper from 'src/utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { contactUsMessage } from 'src/redux/slices/messaging';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(13, 0, 0)
  },
  heading: {
    color: theme.palette.secondary.main,
    lineHeight: 1,
    marginRight: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h4.fontSize
    }
  }
}));

// ----------------------------------------------------------------------

function ContactView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.authJwt);
  const { error: contactError } = useSelector((state) => state.messaging);

  useEffect(() => {
    setLoaded(false);
  }, [loaded])

  const ContactSchema = Yup.object().shape({
    companyName: Yup.string().required(t("Company Name Is Required")),
    name: Yup.string().required(t("Name Is Required")),
    phone: Yup.string().trim().matches('^[0-9]*$', t('Phone number is not valid'))
      .length(11, t('Phone number must be 11')).required(t("Mobile Is Required")),
    email: Yup.string()
      .email(t("Email Is Invalid"))
      .required(t("Email Is Required")),
    notes: Yup.string().required(t("Notes Is Required"))
  });


  const submit = async (values) => {

    await dispatch(
      contactUsMessage({
        name: values.name,
        email: values.email,
        mobile: helper.reconstructPhone(parseInt(values.countryId), values.phone, countries),
        countryId: values.countryId,
        companyName: values.companyName,
        notes: values.notes,
      })
    );
    setLoaded(true);
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      countryId: '1',
      companyName: '',
      notes: '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await submit(values);
        helper.enqueueSnackbarMessage(enqueueSnackbar, t("Your message sent successfully"), 'success', closeSnackbar)
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        resetForm();
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code || error.message });
          setSubmitting(false);
        }
      }
    }
  });

  return (
    <Page title={t("contactUs")} className={classes.root}>
      <Container maxWidth="sm">
        <Box sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom className={classes.heading}>
            {t('Contact Our Team')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('Fill the form and we will contact you as soon as possible')}
          </Typography>
        </Box>
        <Card sx={{ px: 2, py: 3, my: 3 }}>
          {contactError != null && <Alert severity="error" sx={{ mb: 3 }}>
            {contactError.data ? contactError.data : contactError.status}
          </Alert>}
          <ContactForm formik={formik} />
        </Card>
      </Container>
    </Page>
  );
}

export default ContactView;
