import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import PlanCard from './PlanCard';
import { useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
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
  toggleBtnGroup: {
    margin: '30px auto 20px',
    display: 'block',
    textAlign: 'center',
    '& .rtl-zzs54p-MuiButtonBase-root-MuiToggleButton-root.Mui-selected , & .css-1b361h4-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': {
      color: theme.palette.secondary.dark
    }
  },
  toggleBtnChild: {
    fontSize: theme.typography.body1.fontSize,
    borderColor: "#88A2AE",
    color: '#637381',
    '@media (max-width: 610px) and (min-width: 600px)': { fontSize: '0.95rem' },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderRadius: 0,
      borderBottom: 0,
      borderLeft: '1px solid #88A2AE !important',
      '&:last-of-type': {
        borderBottom: '1px solid #88A2AE',
      }
    },
  }
}));


// ----------------------------------------------------------------------

function PricesView() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { planFeatures, isLoading, availablePlans } = useSelector((state) => state.authJwt);
  const [premiumPlan, setPremiumPlan] = useState();

  useEffect(() => {
    if (availablePlans[1])
      setPremiumPlan(availablePlans[1]?.planDurations[2]);
  }, [isLoading]);

  return (
    <Page title="Prices | Minimal UI" className={classes.root}>
      <LoadingOverlay
        active={isLoading}
        styles={{
          wrapper: {
            width: "100%",
            height: "100%",
          },
        }}
        spinner={
          <LoadingScreen />
        }
      >
        <Container maxWidth="lg">
          <Box sx={{ pb: 4 }}>
            <Box sx={{ mx: 'auto', textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom className={classes.heading}>
                {t('Try our free package now, and upgrade to the premium plan to grow your business')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t('You can access huge numbers of auto spare parts and deal with great number of vendors')}
              </Typography>
            </Box>
            <ToggleButtonGroup value={premiumPlan} exclusive className={classes.toggleBtnGroup}>
              {availablePlans[1]?.planDurations.map((duration, index) => (
                <ToggleButton
                  key={index}
                  value={duration}
                  onClick={() => setPremiumPlan(duration)}
                  className={classes.toggleBtnChild}
                >
                  {t("Pay")}  {duration.calculationDays === 30 ?
                    t('Month') :
                    duration.calculationDays === 180 ?
                      6 + ' ' + t('Months') + ' ' + '-' + ' ' + t("Save") + ' ' +
                      Math.round(((duration.discountPercentage * (availablePlans[1].price / 360))) * duration.calculationDays)
                      + ' ' + t('SAR') :
                      t('Yearly') + ' ' + '-' + ' ' + t("Save") + ' ' +
                      Math.round(((duration.discountPercentage * (availablePlans[1].price / 360))) * duration.calculationDays)
                      + ' ' + t('SAR')
                  }
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Grid container spacing={2}>
              {planFeatures.map((plan, index) => (
                <Grid item xs={12} md={4} key={index} className={classes.gutter}>
                  <PlanCard plan={plan} duration={premiumPlan} />
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
