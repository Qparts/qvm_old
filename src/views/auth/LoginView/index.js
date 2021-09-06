import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Section from '../Ui/Section';
import Header from '../Ui/Header';
import { useFormik } from 'formik';
import LoginForm from './LoginForm';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import { PATH_PAGE } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Alert,
  Hidden,
  Container,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getInitialize } from 'src/redux/slices/authJwt';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  content: {
    maxWidth: 600,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
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

function LoginView() {
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const { error: loginError } = useSelector(
    (state) => state.authJwt
  );


  useEffect(() => {
    setLoaded(false);
  }, [loaded])

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Email Is Invalid"))
      .required(t("Email Is Required")),
    password: Yup.string().required(t("Password Is Required"))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login({
          email: values.email,
          password: values.password
        });

        await dispatch(getInitialize());

        setLoaded(true);
        helper.enqueueSnackbarMessage(enqueueSnackbar, t("Login success"), 'success', closeSnackbar)
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.code || error.message });
        }
      }
    }
  });

  return (
    <Page title={t("Login")} className={classes.root}>

      <Header
        auth={t("Don't have account?")}
        url={PATH_PAGE.auth.register}
        title={t("Register now")} />

      <Hidden mdDown>
        <Section />
      </Hidden>

      <Container maxWidth="sm">
        <div className={classes.content}>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" gutterBottom className={classes.heading}>
                {t("Sign into QVM Vendor Market Place")}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t("Enter your details below")}
              </Typography>
            </Box>

          </Box>


          {loginError != null && <Alert severity="error" sx={{ mb: 5 }}>
            {loginError.data ? loginError.data : loginError.status}
          </Alert>}

          <LoginForm formik={formik} />

          <Hidden smUp>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {t("Don't have account?")} &nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_PAGE.auth.register}
              >
                {t("Register now")}
              </Link>
            </Typography>
          </Hidden>
        </div>
      </Container>
    </Page>
  );
}

export default LoginView;
