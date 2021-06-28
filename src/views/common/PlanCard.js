import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography, Box, Grid, Link, Divider } from '@material-ui/core';
import { MLabel } from 'src/theme';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
      padding: theme.spacing(5)
    },

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

  },

  dialog: {
    boxShadow: 'none',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('xl')]: {
      height: 320
    }
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
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { themeDirection } = useSelector((state) => state.settings);
  const { planFeatures, isLoading, availablePlans } = useSelector(
    (state) => state.authJwt
  );
  const imagePath = plan.name === 'Basic Plan' ? '/static/icons/ic_plan_free.svg' :
    plan.name === 'Premium Plan' ? '/static/icons/ic_plan_starter.svg' :
      '/static/icons/ic_plan_premium.svg';


  const getSaveValue = () => {
    return Math.round((duration.discountPercentage * (availablePlans[1].price / 360) * duration.calculationDays));
  }

  return (
    <Card className={clsx(classes.root)}>
      {plan.name === 'Premium Plan' && (
        <MLabel
          color="info"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          {themeDirection == 'ltr' ? plan.name : plan.nameAr}
        </MLabel>
      )}

      <Typography>
        {themeDirection == 'ltr' ? plan.name : plan.nameAr}
      </Typography>

      <br />



      < Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize'
        }}
      >
        {plan.name == 'Premium Plan' && duration && getSaveValue() > 0 ?
          t("Save") +
          getSaveValue()
          + ' ' + t('SAR')
          : ''}
      </Typography>



      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>

        <Typography variant="h2" sx={{ mx: 1 }}>
          {plan.name === 'Basic Plan' ? t('Free') : plan.name === 'Premium Plan' && duration ?
            Math.round(((availablePlans[1].price / 360) - (duration.discountPercentage * (availablePlans[1].price / 360))) * duration.calculationDays)
            : '-'}
        </Typography>
      </Box>


      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize'
        }}
      >
        {plan.name === 'Basic Plan' ? t('Forever') : plan.name === 'Premium Plan' ?
          duration.calculationDays == 30 ? t('SAR') + '/' + t('Monthly') :
            duration.calculationDays == 180 ?
              t('SAR') + '/' + 6 + ' ' + t('Months') : t('SAR') + '/' + t('Yearly') : '-'}
      </Typography>


      <Box
        component="img"
        src={imagePath}
        sx={{ width: 80, height: 80, mt: 3 }}
      />


      <Box component="ul" sx={{ my: 5, width: '100%' }}>

        {plan.features.map((item, index) => (
          <Grid container key={index}  >
            <Grid item xs={6}>

              <Box
                key={item.text}
                component="li"
                sx={{
                  display: 'flex',
                  typography: 'body2',
                  alignItems: 'center',
                  color: item.isAvailable ? 'text.primary' : 'text.disabled',
                  '&:not(:last-of-type)': { mb: 2 }
                }}
              >
                {themeDirection == 'ltr' ? item.name : item.nameAr}
              </Box>


            </Grid>

            <Grid item xs={6}>
              {themeDirection == 'ltr' ? item.value : item.valueAr}
            </Grid>

          </Grid>

        ))}

        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          onClick={() => {
            setOpen(true);
          }}
        >
          {t("Who subscribed in this package")}
        </Link>
      </Box>

      <Button
        to={PATH_APP.root}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => history.push(PATH_PAGE.auth.register)}
      >
        {plan.name != 'Custom Plan' ? t('Signup') : t('Contact Our Team')}
      </Button>


      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
        onClose={() => {
          setOpen(false);
        }
        }
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            {t("Subscribers to the package") + (themeDirection == 'ltr' ? plan.name : plan.nameAr)}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container  >
            {

              plan.companies.map((company, index) => {
                if (company.logo == null)
                  return (
                    <Grid item xs={12} key={index}>
                      <Typography variant="h6" component="div">
                        {company.name}
                      </Typography>
                      <Divider />
                    </Grid>
                  )
                else
                  return (
                    <Grid item xs={4} key={index}>
                      <Box>
                        <img
                          style={{ margin: 20 }}
                          src={company.logo}
                          alt={company.name}
                        />
                      </Box>
                    </Grid>
                  )
              })
            }
          </Grid>
        </DialogContent>
      </Dialog>
    </Card >
  );
}

export default PlanCard;
