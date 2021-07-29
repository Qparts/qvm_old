import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import {
  varFadeInUp,
  MotionInView,
  varFadeInRight,
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Typography, List, ListItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'src/utils/formatFontSize';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(12)
      }
    },

    article: {
      zIndex: 1,
      position: 'absolute',
      transform: 'translate(0 , -50%)',
      left: 15,
      top: ' 50%',
      [theme.breakpoints.up('sm')]: {
        width: 'calc(60% - 50px)',
      },
      [theme.breakpoints.up('md')]: {
        width: 'calc(50% - 50px)',
      }
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
    partBg: {
      height: 'auto',
    },
    partImg: {
      marginBottom: -9,
      '& >img': {
        position: 'absolute',
        left: 0,
        [theme.breakpoints.up('md')]: {
          width: '58%',
        },
        [theme.breakpoints.up('lg')]: {
          width: '730px',
        },
        [theme.breakpoints.down('md')]: {
          display: 'none'
        },
      }
    },
    partInfo: {
      padding: '60px 35px',
      marginTop: 60,
      [theme.breakpoints.up('md')]: {
        position: 'relative',
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: -2,
        width: 2,
        height: '28%',
        background: ' #164B63',
      },
      "&:after": {
        content: "''",
        position: 'absolute',
        top: 0,
        right: -2,
        width: 2,
        height: '100%',
        background: '#164B63',
      },
      [theme.breakpoints.down('md')]: {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '10px 10px 0',
        '&:before': {
          height: '100%',
          right: 0,
          left: 'auto'
        },
        '&:after': {
          height: '200%',
          right: 'auto',
          left: 0
        },
      }
    },
    arrow: {
      width: '100%',
      position: 'absolute',
      top: 0,
      height: 2,
      background: '#164B63',
      right: 0,
    },
    bgArrow: {
      position: 'absolute',
      bottom: -5,
      right: -9,
      [theme.breakpoints.down('md')]: {
        right: 'auto',
        left: -8,
        bottom: 'calc(-100% - 14px)'
      }
    },
    infoList: {
      display: 'flex',
      flexWrap: 'nowrap',
      '& li': {
        marginLeft: 10,
        marginRight: 10,
        minHeight: 190,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        '&:first-child': {
          background: theme.palette.primary.main,
        },
        '&:last-child': {
          background: '#0e648b',
        },
        '&:nth-child(2)': {
          background: '#55babf',
        },
        '& p': {
          fontSize: pxToRem(60),
          fontWeight: 300,
          color: theme.palette.grey[0],
          marginBottom: 0,
          lineHeight: 0.7,
          textAlign: 'center',
          '& span': {
            fontSize: pxToRem(22),
            fontWeight: 700,
            marginLeft: 5,
          }
        },
        '& label': {
          color: theme.palette.grey[0],
          display: 'block',
          fontWeight: 700,
          fontSize: pxToRem(26),
          marginTop: 15,
          marginBottom: 0,
          textAlign: 'center',
        },
        [theme.breakpoints.down('md')]: {
          minHeight: 87,
          paddingTop: 20,
          paddingBottom: 20,
          marginRight: 5,
          marginLeft: 5,
          '& p': {
            fontSize: 27,
            '& span': {
              fontSize: 13,
            }
          },
          '& label': {
            fontSize: 13,
            marginTop: 10,
          }
        },
      }
    },
    artical: {
      [theme.breakpoints.down('md')]: {
        paddingLeft: 15,
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: 270,
        marginTop: -43,
      }
    },
    infoImgSm: {
      position: 'static',
      width: '90%',
      marginRight: -15,
      alignSelf: 'flex-end',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      },
    }
  };
});

// ----------------------------------------------------------------------

BenPartAvailabilityefits.propTypes = {
  className: PropTypes.string
};
function BenPartAvailabilityefits({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item lg={12} className={classes.partBg} >
            <MotionInView variants={varFadeInRight}>
              <Box className={classes.partImg} position="relative">
                <img src="/static/images/part-info.jpg" />
              </Box>
            </MotionInView>

            <Box display="flex" justifyContent="flex-end" position="relative">
              <Grid item md={10} lg={8} position="relative" display='flex' flexDirection='column'>
                <img src="/static/images/part-info.jpg" className={classes.infoImgSm} />
                <MotionInView variants={varFadeInUp}>
                  <Box className={classes.partInfo} >
                    <span className={classes.arrow}></span>
                    <span className={classes.bgArrow}><img src="/static/images/arrow-down.svg" /></span>
                    <List className={classes.infoList}>
                      <ListItem>
                        <p>100</p>
                        <label> {t("Vendor")} </label>
                      </ListItem>
                      <ListItem>
                        <p>+800</p>
                        <label> {t("Amount")} </label>
                      </ListItem>
                      <ListItem>
                        <p>200<span> {t("SAR")} </span></p>
                        <label> {t("Price average")} </label>
                      </ListItem>
                    </List>
                  </Box>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <article className={classes.artical}>
                    <Typography variant="h3" mb={2} className={classes.articleHeading}>
                      {t("Spare Parts Availability & Price Information")}
                    </Typography>
                    <p className={classes.articleDisc}>
                      {t("No more time wasting in sending emails, faxes, and phone calls to find required spare parts The item might be available at the vendor next door Through QVM you can find the items you want within seconds and order them directly")}
                    </p>
                  </article>
                </MotionInView>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BenPartAvailabilityefits;
