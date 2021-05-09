import React, {  } from 'react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';


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
            THANK YOU FOR REGISTRATION IN QSTOCK
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Your request have been sent, Your application will be reviewed by our team we will contact with you soon.
          </Typography>


        </Box>
      </Container>
    </Page>
  );
}

export default ConfirmView;
