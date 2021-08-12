import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, Box, Grid, Link, Divider, ListItem, List } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Ui/Button';
import CustomDialog from '../../components/Ui/Dialog';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '50px 10px 30px',
    border: '1px solid #E4E4E4',
    textAlign: 'center',
    height: 'calc(100% - 0px)',
    boxShadow: 'none',
    borderRadius: 0,
  },
  planPremiumLabel: {
    position: 'absolute',
    top: 0,
    background: 'linear-gradient(90deg, #167DAC 10%, #164B63 100%)',
    borderRadius: '0 0 30px 30px',
    color: theme.palette.grey[0],
    padding: '8px 20px',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  planHead: {
    color: theme.palette.secondary.main,
    lineHeight: 1,
    marginBottom: '15px'
  },
  planFeatures: {
    borderTop: '1px solid #E4E4E4',
    paddingTop: '20px',
    marginTop: '30px'
  },
  planFeaturesChild: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #efefef',
    '&:last-of-type': {
      border: 0,
      paddingBottom: 0
    },
    '&:first-of-type': {
      paddingTop: 0
    }
  },
  planFeaturesOptionChild: {
    background: '#e5f3f9',
    color: '#164B63',
    padding: '3px 8px',
    borderRadius: '30px',
  },
  planUsed: {
    display: 'block',
    textAlign: 'left',
    padding: ' 0 10px',
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
  },
  basicPlan: {
    borderRadius: '30px 0 0 30px',
    borderRight: 0
  },
  customPlan: {
    borderRadius: '0 30px 30px 0',
    borderLeft: 0
  },
  premiumPlan: {
    borderColor: 'rgba(238, 64, 54, 0.6)',
    boxShadow: '0 0 30px rgb(238 64 54 / 16%)',
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function PlanCard({ plan, duration }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { themeDirection } = useSelector((state) => state.settings);
  const { availablePlans } = useSelector((state) => state.authJwt);
  const imagePath = plan.name === 'Basic Plan' ? '/static/icons/ic_plan_free.svg' :
    plan.name === 'Premium Plan' ? '/static/icons/ic_plan_starter.svg' :
      '/static/icons/ic_plan_premium.svg';

  const getSaveValue = () => {
    return Math.round((duration.discountPercentage * (availablePlans[1].price / 360) * duration.calculationDays));
  };

  let cardStyle;
  if (plan.name === 'Custom Plan')
    cardStyle = classes.customPlan;
  else if (plan.name === 'Basic Plan')
    cardStyle = classes.basicPlan;
  else if(plan.name == 'Premium Plan' && duration && duration.calculationDays > 180)
    cardStyle = classes.premiumPlan;

  return (
    <Card className={clsx(classes.root, cardStyle)}>

      {plan.name === 'Premium Plan' && (
        <Typography variant="subtitle1" className={classes.planPremiumLabel}> {t("Most popular")} </Typography>
      )}

      <Box sx={{ minHeight: '72px', marginBottom: '10px' }}>
        <Typography variant='h3' className={classes.planHead}>{themeDirection == 'ltr' ? plan.name : plan.nameAr} </Typography>

        <Typography
          variant='subtitle1'
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightRegular,
          }}
        >
          {plan.name == 'Premium Plan' && duration && getSaveValue() > 0 ?
            t("Save") + ' ' +
            getSaveValue()
            + ' ' + t('SAR')
            : ''}
        </Typography>
      </Box>

      {plan.name === 'Custom Plan' ?
        <Box
          component="img"
          alt="Custom"
          src="/static/images/custom.svg"
          height={80}
          sx={{ margin: '0 auto 20px' }}
        />
        :
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h2"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 400,
              lineHeight: 1
            }}>
            {plan.name === 'Basic Plan' ? t('Free') : plan.name === 'Premium Plan' && duration ?
              Math.round(((availablePlans[1].price / 360) - (duration.discountPercentage * (availablePlans[1].price / 360))) * duration.calculationDays)
              : '-'}
          </Typography>

          <Typography variant="h5" sx={{ color: '#8B8B8B' }}>
            {plan.name === 'Basic Plan' ? t('Forever') : plan.name === 'Premium Plan' && duration ?
              duration.calculationDays == 30 ? t('SAR') + ' ' + '/' + ' ' + t('Monthly') :
                duration.calculationDays == 180 ?
                  t('SAR') + ' ' + '/' + ' ' + 6 + ' ' + t('Months') : t('SAR') + ' ' + '/' + ' ' + t('Yearly') : '-'}
          </Typography>
        </Box>
      }

      <Button
        to={PATH_APP.root}
        homeBtnLight={plan.name === 'Basic Plan' ? 'homeBtnLight' : null}
        homeBtn='homeBtn'
        btnWidth='btnWidth'
        onClick={() => history.push(PATH_PAGE.auth.register)}
      >
        {plan.name != 'Custom Plan' ? t('Signup') : t('Contact Our Team')}
      </Button>

      <Box className={classes.planFeatures}>
        <List sx={{ padding: '0 10px' }}>
          {plan.features.map((feature, index) => {
            return (
              <ListItem key={index} className={classes.planFeaturesChild}>
                <Typography variant="body3">
                  {themeDirection == 'ltr' ? feature.name : feature.nameAr}
                </Typography>
                <Typography variant="body4" className={feature.value ? classes.planFeaturesOptionChild : null}>
                  {themeDirection == 'ltr' ? feature.value : feature.valueAr}
                </Typography>
              </ListItem>
            )
          })}
        </List>
        <Link
          className={classes.planUsed}
          variant="body1"
          component={RouterLink}
          onClick={() => {
            setOpen(true);
          }}
        >
          {t("Who subscribed in this package")}
        </Link>
      </Box>

      <CustomDialog
        open={open}
        handleClose={() => setOpen(false)}
        title={t("Subscribers to the package") + (themeDirection == 'ltr' ? plan.name : plan.nameAr)}>
        <Grid container spacing={2}>
          {plan.companies.map((company, index) => {
            if (company.logo == null)
              return (
                <Grid item xs={12} key={index}>
                  <ListItem sx={{ padding: theme.spacing(0, 0, 2, 0) }}>
                    {company.name}
                  </ListItem>
                  <Divider />
                </Grid>
              )
            else
              return (
                <Grid item xs={6} sm={4} key={index}>
                  <Box sx={{
                    border: '1px solid #efefef',
                    padding: '10px'
                  }}>
                    <Box
                      component="img"
                      alt={company.name}
                      src={company.logo}
                      sx={{ margin: '0 auto' }}
                    />
                  </Box>
                </Grid>
              )
          })}
        </Grid>
      </CustomDialog>
    </Card >
  );
}

export default PlanCard;
