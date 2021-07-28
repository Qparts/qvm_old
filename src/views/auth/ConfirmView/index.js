import React, { } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Hidden } from '@material-ui/core';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';


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
            {t("THANK YOU FOR REGISTRATION IN QVM")}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {t("Your request have been sent, Your application will be reviewed by our team we will contact with you soon.")}
          </Typography>
        </Box>
      </Container>
    </Page>
  );
}

export default ConfirmView;
