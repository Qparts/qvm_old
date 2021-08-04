import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { varFadeInUp, MotionInView } from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12)
    },
    heroBg: {
      backgroundImage: `url("/static/images/hero-bg.jpg")`,
      borderBottomRightRadius: 200,
      backgroundPosition: 'cover cover',
      height: '100%',
      width: '200%',
      right: -50,
      top: 0,
      [theme.breakpoints.down('md')]: {
        right: 0,
      }
    },
    title: {
      color: theme.palette.grey[0],
      fontWeight: 500
    },
    inputWhite: {
      backgroundColor: theme.palette.grey[0],
      borderRadius: 11,
      width: '60%',
      "& label": {
        backgroundColor: theme.palette.grey[0],
        borderRadius: 10,
      }
    },
    margin: {
      marginLeft: 15,
      height: 56,
      width: '20%',
    }
  };

});

// ----------------------------------------------------------------------

NewsLetter.propTypes = {
  className: PropTypes.string
};

function NewsLetter({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container direction="row" justifyContent="center">
        <Grid item md={8} sm={12} position="relative" py={10} mx={2}>
          <Box position="absolute" className={classes.heroBg}></Box>
          <MotionInView variants={varFadeInUp}>
            <Box position="relative">
              <Typography variant="h3" className={classes.title}>
                {t("Subscribe to our newsletter")}
              </Typography>
              <Box mt={3} >
                <TextField
                  label={t("Enter email")}
                  id="outlined-size-small"
                  variant="outlined"
                  className={classes.inputWhite}
                />
                <Button variant="contained" color="primary" size="large" className={classes.margin}>
                  {t("Subscribe")}
                </Button>
              </Box>
            </Box>
          </MotionInView>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewsLetter;
