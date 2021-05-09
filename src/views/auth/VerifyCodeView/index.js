import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { useSnackbar } from 'notistack';
import VerifyCodeForm from './VerifyCodeForm';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'react-redux';
import { PATH_PAGE } from 'src/routes/paths';


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
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required'),
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
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>

          <Typography variant="h3" gutterBottom>
            Please check your email!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 4-digit confirmation code to {props.location.state.email}, please
            enter the code in below box to verify your email.
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
