import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { PATH_PAGE } from 'src/routes/paths';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography, Hidden, Link } from '@material-ui/core';

import { useSelector } from 'react-redux';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  },
  header: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

function ForgotPasswordView() {
  const classes = useStyles();
  const { forgotPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [sent, setSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const { error: forgetPasswordError } = useSelector((state) => state.authJwt);

  useEffect(() => {
    if (loaded && forgetPasswordError == '') {
      setSent(true);
    }
  }, [loaded])

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Email Is Invalid"))
      .required(t("Email Is Required"))
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await forgotPassword(values.email);
        setLoaded(true);
        if (isMountedRef.current) {
          // setSent(true);
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  return (
    <Page title={t("Forgot Password?")} className={classes.root}>

      <header className={classes.header}>
        <Hidden smDown>
          <Typography variant="body2" sx={{ mt: { md: -4 } }}>
            <Languages />
          </Typography>
        </Hidden>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" sx={{color: (theme) => theme.palette.secondary.main}} gutterBottom>
                {t("Forgot your password?")}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                {t("Please enter the email address associated with your account and We will email you a link to reset your password")}
              </Typography>

              <ForgotPasswordForm formik={formik} />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
                sx={{ mt: 1 }}
              >
                {t("Back")}
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                alt="sent email"
                src="/static/icons/ic_email_sent.svg"
                sx={{ mb: 5, mx: 'auto' }}
              />
              <Typography variant="h3" gutterBottom>
                {t("Request sent successfully")}
              </Typography>
              <Typography>
                {t("We have sent a confirmation email to")} &nbsp;
                <strong>{formik.values.email}</strong>
                <br />
                {t("Please check your email!")}
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
                sx={{ mt: 5 }}
              >
                {t("Back")}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default ForgotPasswordView;
