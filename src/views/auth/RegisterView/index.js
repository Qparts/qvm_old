import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Section from './Section';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import RegisterForm from './RegisterForm';
import { PATH_PAGE } from 'src/routes/paths';
import closeFill from '@iconify-icons/eva/close-fill';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import SocialLogin from 'src/views/auth/LoginView/SocialLogin';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Hidden, Container, Typography, Alert } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import helper from 'src/utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';
import { register } from 'src/redux/slices/authJwt';

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
      padding: theme.spacing(4, 5, 0, 7)
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
  }
}));

// ----------------------------------------------------------------------

function RegisterView() {
  const classes = useStyles();
  const { method } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countries, error: registerError } = useSelector(
    (state) => state.authJwt
  );



  const goToVerification = () => {
    enqueueSnackbar('Register success', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });

    history.push(
      PATH_PAGE.auth.verify,
      { email: email }
    );
  }


  useEffect(() => {
    if (loaded && registerError == null) {
      goToVerification();
    }
    setLoaded(false);

  }, [loaded])


  const RegisterSchema = Yup.object().shape({
    companyName: Yup.string().required(t("Company Name Is Required")),
    name: Yup.string().required(t("Name Is Required")),
    phone: Yup.string().trim().matches('^[0-9]*$', t('Phone number is not valid'))
      .length(11, t('Phone number must be 11')).required(t("Mobile Is Required")),
    email: Yup.string()
      .email(t("Email Is Invalid"))
      .required(t("Email Is Required")),
    password: Yup.string().required(t("Password Is Required"))
  });


  const submit = async (values) => {

    await dispatch(
      register({
        email: values.email,
        password: values.password,
        mobile: helper.reconstructPhone(parseInt(values.countryId), values.phone, countries),
        companyName: values.companyName,
        name: values.name,
        countryId: values.countryId,
        regionId: "1",
        cityId: "1",
      })
    );

    setEmail(values.email);
    setLoaded(true);
  }


  const formik = useFormik({
    initialValues: {
      companyName: '',
      name: '',
      countryId: 1,
      phone: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await submit(values);
        if (isMountedRef.current) {
          setSubmitting(false);
        }

      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code || error.message });
          setSubmitting(false);
        }
      }
    }
  });

  return (
    <Page title="Register | Minimal-UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden smDown>
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            {t("Already have an account?")} &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.login}
            >
              {t("Login")}
            </Link>
            <Languages />
          </Typography>
        </Hidden>
      </header>

      <Hidden mdDown>
        <Section />
      </Hidden>

      <Container>
        <div className={classes.content}>
          <Box display="flex" alignItems="flex-end">
            <Box >
              <Typography variant="h3" className={classes.heading}>
                {t("Signup Request in")}
              </Typography>
            </Box>
            <Box
              component="img"
              src={`/static/images/QVM.svg`}
              sx={{ width: 100 }}
            />
          </Box>

          {method === 'firebase' && <SocialLogin />}


          {registerError != null && <Alert severity="error">  {registerError.data ?
            t(registerError.data) : registerError.status} </Alert>}

          <Box sx={{ mb: 3 }} />

          <RegisterForm formik={formik} />



          <Hidden smUp>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link
                variant="subtitle2"
                to={PATH_PAGE.auth.login}
                component={RouterLink}
              >
                Login
              </Link>
            </Box>
          </Hidden>
        </div>
      </Container>
    </Page>
  );
}

export default RegisterView;
