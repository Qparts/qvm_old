import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInUp
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Hidden, Link } from '@material-ui/core';
import LogoDark from 'src/components/LogoDark';
import { pxToRem } from 'src/utils/formatFontSize';
import Button from '../../../components/Ui/Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',

    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    }
  },
  content: {
    zIndex: 10,
    maxWidth: 700,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    '& h1': {
      '@media (max-width: 677px) and (min-width: 600px)': {
        fontSize: theme.direction === 'ltr' ? '2.46rem' : '3rem'
      },
      '@media (max-width: 475px) and (min-width: 375px)': {
        fontSize: theme.direction === 'ltr' ? '2.3rem' : '3rem'
      },
      '@media (max-width: 374px) and (min-width: 300px)': {
        fontSize: theme.direction === 'ltr' ? '1.8rem' : '3rem'
      },
    }
  },
  heroOverlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderBottomRightRadius: 300,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    }
  },
  listIcon: {
    display: 'flex',
    marginTop: theme.spacing(5),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    '& > :not(:last-of-type)': {
      marginRight: theme.spacing(1.5)
    }
  },
  title: {
    // fontSize: pxToRem(48),
    lineHeight: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: theme.palette.grey[1100],
  },
  description: {
    fontSize: pxToRem(20),
    padding: theme.spacing(3, 0, 5),
    color: theme.palette.grey[1100],
    [theme.breakpoints.down('sm')]: {
      fontSize: pxToRem(20),
    },
  },
}));
// ----------------------------------------------------------------------

Hero.propTypes = {
  className: PropTypes.string
};
function Hero({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        className={clsx(classes.root, className)}
      >
        <motion.img
          alt="overlay"
          src="/static/images/home-banner.jpeg"
          variants={varFadeIn}
          className={classes.heroOverlay}
        />
        <Container maxWidth="lg">
          <div className={classes.content}>
            <motion.div variants={varFadeInUp}>
              <Typography variant="h3" className={classes.title}>
                {t("Vendor marketplace")}
                <Hidden smDown><LogoDark width={170} ml={2} /></Hidden>
                {t("in its new look")}
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInUp}>
              <Box component="p" className={classes.description}>
                {t("header subtitle")}
              </Box>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Button
                btnM="btnM"
                target="_blank"
                homeBtn="homeBtn"
                btnWidth="btnWidth"
                component={Link}
                href='https://qvm.qparts.co/signin'
              >
                {t("login")}
              </Button>
              <Button
                target="_blank"
                homeBtn="homeBtn"
                darkBtn="darkBtn"
                btnWidth="btnWidth"
                component={Link}
                href='https://qvm.qparts.co/signup'
              >
                {t("registeration")}
              </Button>
            </motion.div>
          </div>
        </Container>
      </motion.div>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

export default Hero;
