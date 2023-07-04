import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, Box, ListItem, List } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Ui/Button';

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
    '@media (max-width: 325px)': {
      left: '46%',
      transform: 'translate(-46%, 0)'
    },
  },
  planHeadSec: {
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      minHeight: 'auto'
    },
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
    },
    '@media (max-width: 1070px) and (min-width: 960px)': {
      '&:first-of-type': {
        display: 'block',
        textAlign: 'right',
        '& span:first-of-type': {
          display: 'block',
          textAlign: 'left',
        }
      }
    },
    '@media (max-width: 1000px) and (min-width: 960px)': {
      display: theme.direction === 'ltr' ? 'block' : 'flex',
      textAlign: 'right',
      '& span:first-of-type': {
        display: theme.direction === 'ltr' ? 'block' : 'flex',
        textAlign: 'left',
      }
    },
    '@media (max-width: 432px)': {
      display: theme.direction === 'ltr' ? 'block' : 'flex',
      textAlign: 'right',
      '& span:first-of-type': {
        display: theme.direction === 'ltr' ? 'block' : 'flex',
        textAlign: 'left',
      }
    },
    '@media (max-width: 365px)': {
      '&:first-of-type': {
        display: 'block',
        textAlign: 'right',
        '& span:first-of-type': {
          display: 'block',
          textAlign: 'left',
        }
      }
    },
  },
  planFeaturesOptionChild: {
    background: '#e5f3f9',
    color: '#164B63',
    padding: '3px 8px',
    borderRadius: '30px',
  },
  basicPlan: {
    borderRadius: '30px 0 0 30px',
    borderRight: 0,
    [theme.breakpoints.down('md')]: {
      borderRight: '1px solid #E4E4E4',
      borderRadius: 0
    },
  },
  premiumPlan: {
    borderColor: 'rgba(238, 64, 54, 0.6)',
    borderRadius: '0 30px 30px 0',
    [theme.breakpoints.down('md')]: {
      borderRadius: 0
    },
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function PlanCard({ plan }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const history = useHistory();
  const { themeDirection } = useSelector((state) => state.settings);

  let cardStyle;
  if (plan.name === 'Basic Plan')
    cardStyle = classes.basicPlan;
  else if (plan.name == 'Premium Plan')
    cardStyle = classes.premiumPlan;

  return (
    <Card className={clsx(classes.root, cardStyle)}>

      {plan.name === 'Premium Plan' && (
        <Typography variant="subtitle1" className={classes.planPremiumLabel}> {t("Most popular")} </Typography>
      )}

      <Box className={classes.planHeadSec}>
        <Typography variant='h3' className={classes.planHead}>{themeDirection == 'ltr' ? plan.name : plan.nameAr} </Typography>
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h2"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 400,
            lineHeight: 1
          }}>
          {plan.name === 'Basic Plan' ? t("Free") : plan.price}
        </Typography>

        <Typography variant="h5" sx={{ color: '#8B8B8B' }}>
          {plan.name === 'Basic Plan' ? t('Forever') :  t('SAR') + ' ' + '/' + ' ' + t('Yearly')}
        </Typography>
      </Box>

      <Button
        to={PATH_APP.root}
        homeBtnLight={plan.name === 'Basic Plan' ? 'homeBtnLight' : null}
        homeBtn='homeBtn'
        btnWidth='btnWidth'
        onClick={() => history.push(PATH_PAGE.auth.register)}
      >
        {t('Signup')}
      </Button>

      <Box className={classes.planFeatures}>
        <List sx={{ padding: '0 10px' }}>
          {plan.features.map((feature, index) => {
            return (
              <ListItem key={index} className={classes.planFeaturesChild}>
                <Typography variant="body3" className={classes.featureName}>
                  {themeDirection == 'ltr' ? feature.name : feature.nameAr}
                </Typography>
                <Typography variant="body4" className={feature.value ? classes.planFeaturesOptionChild : null}>
                  {themeDirection == 'ltr' ? feature.value : feature.valueAr}
                </Typography>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Card >
  );
}

export default PlanCard;
