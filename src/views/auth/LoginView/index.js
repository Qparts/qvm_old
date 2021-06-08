import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Section from './Section';
import { useFormik } from 'formik';
import LoginForm from './LoginForm';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import SocialLogin from './SocialLogin';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import { PATH_PAGE } from 'src/routes/paths';
import closeFill from '@iconify-icons/eva/close-fill';
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Alert,
  Hidden,
  Tooltip,
  Container,
  Typography
} from '@material-ui/core';
import { MIconButton } from 'src/theme';
import { useSelector , useDispatch} from 'react-redux';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';
import { getInitialize } from 'src/redux/slices/authJwt';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7)
    }
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }
}));

// ----------------------------------------------------------------------

function LoginView() {
  const classes = useStyles();
  const { method, login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const { error: loginError } = useSelector(
    (state) => state.authJwt
  );


  useEffect(() => {
    if (loaded && loginError == '') {
      enqueueSnackbar('Login success', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  }, [loaded])

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("signin.error.invalid.email"))
      .required(t("signin.error.require.email")),
    password: Yup.string().required(t("signin.error.require.password"))
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
    <Page title="Login | Minimal-UI" className={classes.root}>

      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden smDown>
          <Typography
            variant="body2"
            sx={{
              mt: { md: -2 }
            }}
          >
            {t("signin.noAccount")} &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.register}
            >
              {t("signin.registerNow")}
            </Link>

            <Languages />
          </Typography>
        </Hidden>
      </header>

      <Hidden mdDown>
        <Section />
      </Hidden>

      <Container maxWidth="sm">
        <div className={classes.content}>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {t("signin.title")}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t("common.enterDetails")}
              </Typography>
            </Box>
            <Tooltip title={'QVM'}>
              <Box
                component="img"
                src={`/static/icons/QVM-logo.png`}
                sx={{ width: 50, height: 50 }}
              />
            </Tooltip>
          </Box>


          {loginError != '' && <Alert severity="error" sx={{ mb: 5 }}>
            {loginError}
          </Alert>}

          <LoginForm formik={formik} />

          <Hidden smUp>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_PAGE.auth.register}
              >
                Get started
              </Link>
            </Typography>
          </Hidden>
        </div>
      </Container>
    </Page>
  );
}

export default LoginView;
