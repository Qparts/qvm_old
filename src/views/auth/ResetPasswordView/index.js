import * as Yup from 'yup';
import { useFormik } from 'formik';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { PATH_PAGE } from 'src/routes/paths';
import ResetPasswordForm from './ResetPasswordForm';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography, Hidden } from '@material-ui/core';
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

function ResetPasswordView() {
  const classes = useStyles();
  const { resetPassword, validateResetToken } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [sent, setSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const codeParam = new URLSearchParams(location.search).get("code");
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const { error: resetPasswordError, validResetToken } = useSelector(
    (state) => state.authJwt
  );


  useEffect(() => {
    (async () => {
      await validateResetToken(codeParam);
      setValidated(true);
    })()

  }, [])



  useEffect(() => {
    if (loaded && resetPasswordError == '') {
      history.push(PATH_PAGE.auth.login);
    }
  }, [loaded])

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required(t("New Password Is Required"))
  });

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword({ code: codeParam, newPassword: values.password });
        setLoaded(true);
        if (isMountedRef.current) {
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
        {validated && <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {validResetToken ? (
            <>

              <ResetPasswordForm formik={formik} />

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
              <Typography variant="h3" gutterBottom>
                {t("The request is not available")}
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
        </Box>}
      </Container>
    </Page>
  );
}

export default ResetPasswordView;
