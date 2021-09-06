import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Hidden, Button } from '@material-ui/core';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import { PATH_PAGE } from 'src/routes/paths';
import ResetPasswordForm from './ResetPasswordForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSelector } from 'react-redux';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import helper from 'src/utils/helper';
import CustomButton from '../../../components/Ui/Button';

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { resetPassword, validateResetToken } = useAuth();
  const isMountedRef = useIsMountedRef();
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
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await resetPassword({ code: codeParam, newPassword: values.password });
        setLoaded(true);
        helper.enqueueSnackbarMessage(enqueueSnackbar, t("Your password has been successfully reset"), 'success', closeSnackbar)
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        resetForm();
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  return (
    <Page title={t("Reset Password")} className={classes.root}>

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
              <Typography variant="h3" sx={{ color: (theme) => theme.palette.secondary.main }} gutterBottom>
                {t("Reset Password")}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                {t("Please enter your new password then press the back button and log in again")}
              </Typography>

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
              <Typography variant="h3" sx={{ mb: 3 }}>
                {t("The request is not available")}
              </Typography>
              <CustomButton
                homeBtn='homeBtn'
                component={RouterLink}
                to={PATH_PAGE.auth.login}
              >
                {t("Back")}
              </CustomButton>
            </Box>
          )}
        </Box>}
      </Container>
    </Page>
  );
}

export default ResetPasswordView;
