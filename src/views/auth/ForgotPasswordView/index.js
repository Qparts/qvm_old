import * as Yup from 'yup';
import { useFormik } from 'formik';
import Logo from 'src/components/Logo';
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
  const { error: forgetPasswordError } = useSelector(
    (state) => state.authJwt
  );


  useEffect(() => {
    if (loaded && forgetPasswordError == '') {
      setSent(true);
    }
  }, [loaded])

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("forgotPassword.error.invalid.email"))
      .required(t("forgotPassword.error.require.email"))
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
    <Page title="Reset Password | Minimal UI" className={classes.root}>

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
              <Typography variant="h3" gutterBottom>
                {t("forgotPassword.title")}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                {t("forgotPassword.message")}
              </Typography>

              <ForgotPasswordForm formik={formik} />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
                sx={{ mt: 1 }}
              >
                {t("common.back")}
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
                {t("forgotPassword.successRequest")}
              </Typography>
              <Typography>
                {t("forgotPassword.confirmMessage")} &nbsp;
                <strong>{formik.values.email}</strong>
                <br />
                {t("verification.checkEmail")}
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
                sx={{ mt: 5 }}
              >
                {t("common.back")}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default ForgotPasswordView;
