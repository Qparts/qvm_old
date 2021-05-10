import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { useSnackbar } from 'notistack';
import VerifyCodeForm from './VerifyCodeForm';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography ,Hidden } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'react-redux';
import { PATH_PAGE } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
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

function VerifyCodeView(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { verify } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const { error: verifyError } = useSelector(
    (state) => state.authJwt
  );


  useLayoutEffect(() => {
    if (loaded) {
      if (verifyError == '') {
        history.push(PATH_PAGE.auth.confirm);
        enqueueSnackbar('Verify success', { variant: 'success' });
      }
      else
        enqueueSnackbar('Verify Fail', { variant: 'error' });

    }
  }, [loaded])

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required(t("verification.error.require.code")),
    code2: Yup.number().required(t("verification.error.require.code")),
    code3: Yup.number().required(t("verification.error.require.code")),
    code4: Yup.number().required(t("verification.error.require.code")),
  });

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values) => {
      let code = values.code1 + '' + values.code2 + '' + values.code3 + '' + values.code4;
      await verify({ code: code, email: props.location.state.email })
      enqueueSnackbar('Verify success', { variant: 'success' });
      setLoaded(true);
    }
  });

  return (
    <Page title="Verify | Minimal UI" className={classes.root}>

      <header className={classes.header}>
        <Hidden smDown>
          <Typography variant="body2" sx={{ mt: { md: -4 } }}>
            <Languages />
          </Typography>
        </Hidden>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>

          <Typography variant="h3" gutterBottom>
            {t("verification.checkEmail")}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {t("verification.verificationMessage" , {email : props.location.state.email})}
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm formik={formik} />
          </Box>

        </Box>
      </Container>
    </Page>
  );
}

export default VerifyCodeView;
