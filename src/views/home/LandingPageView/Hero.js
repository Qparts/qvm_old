import clsx from 'clsx';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { BASE_IMG } from 'src/utils/getImages';
import { useTranslation } from 'react-i18next';
import { PATH_PAGE } from 'src/routes/paths';
import LazySize from 'src/components/LazySize';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInUp
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import Logo from 'src/components/Logo';
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
    maxWidth: 650,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
  },
  heroOverlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderBottomRightRadius: 300,
  },
  heroImg: {
    top: 0,
    left: '50%',
    bottom: 0,
    zIndex: 10,
    margin: 'auto',
    position: 'absolute',
    width: 640,
    transform: 'translateX(-50%)',
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
    fontSize: pxToRem(48),
    lineHeight: 1,
  },
  description: {
    fontSize: pxToRem(26),
    color: theme.palette.secondary.light,
  },
}));
// ----------------------------------------------------------------------
const getImg = (width) =>
  `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/hero.png`;
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
          src="/static/images/hero-bg.jpg"
          variants={varFadeIn}
          className={classes.heroOverlay}
        />
        <LazySize
          component={motion.img}
          noBlur
          noPlaceholder
          alt="hero"
          src="/static/images/hero-artical.svg"

          className={classes.heroImg}
        />
        <Container maxWidth="lg">
          <div className={classes.content}>
            <motion.div variants={varFadeInUp}>
              <Typography variant="h1" sx={{ color: 'common.white' }} display="flex" justifyContent="center" alignItems="flex-end" className={classes.title}>
                {t("Vendor marketplace")}
                <Logo width={170} ml={2} />
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInUp}>
              <Box component="p" sx={{ padding: (theme) => theme.spacing(3, 0, 5) }} className={classes.description}>
                {t("The largest gathering of spare parts dealers in the Middle East")}
              </Box>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Button
                btnWidth="btnWidth"
                homeBtn="homeBtn"
                btnM="btnM"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
              >
                {t("login")}
              </Button>
              <Button
                btnWidth="btnWidth"
                homeBtn="homeBtn"
                whiteBtn="whiteBtn"
                component={RouterLink}
                to={PATH_PAGE.auth.register}
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
