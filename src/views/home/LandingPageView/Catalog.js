import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import {
  varFadeInUp,
  varFadeInDown,
  MotionInView,
  varFadeInRight
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'src/utils/formatFontSize';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(6),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(12)
      }
    },
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.secondary.dark,
    },
    headingWeight: {
      fontWeight: 800,
    },
    headingDisc: {
      fontSize: pxToRem(22),
      fontWeight: 700,
      color: theme.palette.grey[600],

    },
    catalougSec: {
      position: 'relative'
    },
    article: {
      zIndex: 1,
      position: 'absolute',
      transform: 'translate(0 , -50%)',
      top: ' 50%',
      [theme.breakpoints.up('md')]: {
        width: 'calc(60% - 108px)',
      },

    },
    articleHeading: {
      fontSize: pxToRem(38),
      color: theme.palette.secondary.dark,
      [theme.breakpoints.down('md')]: {
        fontSize: pxToRem(25),
      }
    },
    articleDisc: {
      fontSize: pxToRem(17),
      lineHeight: 1.7
    },
    catalougSecBg: {
      height: '100%',
      width: '200%',
      right: 'calc(50% - 80px)',
      top: 0,
      background: '#F7F7F7',
      [theme.breakpoints.down('md')]: {
        left: -24,
      }
    },
    catImageAlign: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '-24px',
      }
    },
    catImage: {
      transform: theme.direction === 'ltr' ? 'scaleX(-1)' : 'scaleX(1)',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '80%',
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: '90%',
      }
    }
  };
});

// ----------------------------------------------------------------------

Catalog.propTypes = {
  className: PropTypes.string
};
function Catalog({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <Box className={classes.heading}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" align="center" className={classes.headingWeight}>
              {t("Features")}
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              gutterBottom
              className={classes.headingDisc}
              variant="overline"
              align="center"
              sx={{ color: 'text.secondary', display: 'block', textTransform: "unset" }}
            >
              {t("We provide different types of services to facilitate your daily tasks")}
            </Typography>
          </MotionInView>
        </Box>
        <Box position='relative' width="100%">
          <Box position='absolute' className={classes.catalougSecBg} />
          <Grid container direction="row" justifyContent="center" >
            <Grid item lg={10} md={10} sm={12} className={classes.catalougSec}>
              <article className={classes.article}>
                <MotionInView variants={varFadeInRight}>
                  <Typography variant="h3" mb={2} className={classes.articleHeading}>
                    {t("Auto Spare Parts Catalog")}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: (theme) => theme.typography.fontWeightRegular }}>
                    {t("Even auto spare parts experts cannot perform daily businesses without auto spare parts catalog That's why we have provided this feature to browse variety of available catalogs, and to find the required item as easy as possible and without unintentional errors")}
                  </Typography>
                </MotionInView>
              </article>
              <MotionInView variants={varFadeInRight}>
                <picture className={classes.catImageAlign}>
                  <source media="(max-width: 960px)" srcset="/static/images/cataloug-img-sm.png" />
                  <img className={classes.catImage} src="/static/images/cataloug-img.png" />
                </picture>
              </MotionInView>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Catalog;
