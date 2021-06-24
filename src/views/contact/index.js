import React, { } from 'react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Hidden } from '@material-ui/core';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';
import Footer from '../../layouts/HomeLayout/Footer';

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

function ConfirmView(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Page title="Verify | Minimal UI" className={classes.root}>


      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>

        
        </Box>
        
      </Container>
    </Page>
  );
}

export default ConfirmView;
