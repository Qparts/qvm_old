import React from 'react';
import Page from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  Typography
} from '@material-ui/core';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(13, 0, 0)
  },
  heading: {
    color: theme.palette.secondary.main,
    lineHeight: 1,
    marginRight: '0.5rem'
  }
}));

// ----------------------------------------------------------------------

function RegisterForm({ formik }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        <Box sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom className={classes.heading}>
            {t('price page title')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('price page caption')}
          </Typography>
        </Box>
        
      </Container>
    </Page>
  );
}

export default RegisterForm;
