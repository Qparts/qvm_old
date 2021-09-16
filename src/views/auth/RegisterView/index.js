import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Section from '../Ui/Section';
import Header from '../Ui/Header';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import RegisterForm from './RegisterForm';
import { PATH_PAGE } from 'src/routes/paths';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Hidden, Container, Typography, Alert } from '@material-ui/core';
import helper from 'src/utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { register } from 'src/redux/slices/authJwt';

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

function RegisterView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countries, error: registerError } = useSelector((state) => state.authJwt);

  const goToVerification = () => {
    helper.enqueueSnackbarMessage(enqueueSnackbar, t("Register success"), 'success', closeSnackbar);
    history.push(PATH_PAGE.auth.verify, { email: email });
  };

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
      .required(t("Mobile Is Required")),
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
    <Page title={t("registeration")} className={classes.root}>

      <Header
        auth={t("Already have an account?")}
        url={PATH_PAGE.auth.login}
        title={t("Login")} />

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
          </Box>

          <Box sx={{ mb: 3 }} />

          {registerError != null && <Alert severity="error">  {registerError.data ?
            t(registerError.data) : registerError.status} </Alert>}

          <Box sx={{ mb: 3 }} />

          <RegisterForm formik={formik} />

          <Hidden smUp>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              {t("Already have an account?")}&nbsp;
              <Link
                variant="subtitle2"
                to={PATH_PAGE.auth.login}
                component={RouterLink}
              >
                {t("Login")}
              </Link>
            </Box>
          </Hidden>
        </div>
      </Container>
    </Page>
  );
}

export default RegisterView;
