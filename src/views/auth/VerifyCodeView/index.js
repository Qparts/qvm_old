import React, { useLayoutEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import VerifyCodeForm from './VerifyCodeForm';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Hidden } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'react-redux';
import { PATH_PAGE } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import TopBar from './../../../layouts/HomeLayout/TopBar';


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
  
  const { themeDirection } = useSelector((state) => state.settings);


  useLayoutEffect(() => {
    if (loaded) {
      if (verifyError == null) {
        history.push(PATH_PAGE.auth.confirm);
        enqueueSnackbar('Verify success', { variant: 'success' });
      }
      else
        enqueueSnackbar(verifyError.data ?
          t(verifyError.data) : verifyError.status, { variant: 'error' });

      setLoaded(false);

    }
  }, [loaded])

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required(t("Verification Code Is Required")),
    code2: Yup.number().required(t("Verification Code Is Required")),
    code3: Yup.number().required(t("Verification Code Is Required")),
    code4: Yup.number().required(t("Verification Code Is Required")),
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
      // let code = values.code1 + '' + values.code2 + '' + values.code3 + '' + values.code4;
      let code = themeDirection == 'ltr' ? values.code1 + '' + values.code2 + '' + values.code3 + '' + values.code4
      : values.code4 + '' + values.code3 + '' + values.code2 + '' + values.code1;
      await verify({ code: code, email: props.location.state.email })
      // enqueueSnackbar('Verify success', { variant: 'success' });
      setLoaded(true);
    }
  });

  return (
    <Page title={t("Verify")} className={classes.root}>
      <TopBar className={classes.header} />
      <Box sx={{ maxWidth: 480, mx: 'auto' }}>
        <Typography variant="h3" gutterBottom>
          {t("Please check your email!")}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t("We have emailed a 4-digit confirmation code to {{email}}, please enter the code in below box to verify your email.", { email: props.location.state.email })}
        </Typography>
        <Box sx={{ mt: 5, mb: 3 }}>
          <VerifyCodeForm formik={formik} />
        </Box>
      </Box>
    </Page>
  );
}

export default VerifyCodeView;
