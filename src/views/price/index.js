import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import LoadingOverlay from "react-loading-overlay";
import PlanCard from './PlanCard';
import Page from 'src/components/Page';
import LoadingScreen from 'src/components/LoadingScreen';
import { planFeatures } from 'src/utils/prices';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    padding: theme.spacing(13, 0, 0)
  },
  heading: {
    color: theme.palette.secondary.main,
    lineHeight: 1,
    marginRight: '0.5rem'
  },
  gutter: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0 + '!important',
      '&:first-of-type': {
        paddingLeft: theme.spacing(2) + '!important'
      }
    },
  },
  overlayFullPage: {
    '& ._loading_overlay_overlay': { position: 'fixed', zIndex: 1101 }
  }
}));


// ----------------------------------------------------------------------

function PricesView() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { isLoading } = useSelector((state) => state.authJwt);

  return (
    <Page title={t("prices")} className={classes.root}>
      <LoadingOverlay
        active={isLoading}
        styles={{
          wrapper: {
            width: "100%",
            height: "100%",
          },
        }}
        className={classes.overlayFullPage}
        spinner={
          <LoadingScreen />
        }
      >
        <Container maxWidth="lg">
          <Box sx={{ pb: 4 }}>
            <Box sx={{ mx: 'auto', textAlign: 'center', marginBottom: '30px' }}>
              <Typography variant="h4" gutterBottom className={classes.heading}>
                {t('Try our free package now, and upgrade to the premium plan to grow your business')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t('You can access huge numbers of auto spare parts and deal with great number of vendors')}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {planFeatures.map((plan, index) => (
                <Grid item xs={12} md={6} key={index} className={classes.gutter}>
                  <PlanCard plan={plan} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </LoadingOverlay>
    </Page>
  );
}

export default PricesView;
