import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { BASE_IMG } from 'src/utils/getImages';
import flashFill from '@iconify-icons/eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_HOME, PATH_PAGE } from 'src/routes/paths';
import LazySize from 'src/components/LazySize';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInUp
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography } from '@material-ui/core';
import Logo from 'src/components/Logo';
import { pxToRem } from 'src/utils/formatFontSize';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height:'100vh',
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
    maxWidth: 520,
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
  whiteBtn: {
    background: theme.palette.grey[0],
    color:theme.palette.primary.main,
    boxShadow:'none',
    marginLeft: 10,
    '&:hover':{
      color: theme.palette.grey[0],
    },
  }
}));
// ----------------------------------------------------------------------
const getImg = (width) =>
  `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/hero.png`;
Hero.propTypes = {
  className: PropTypes.string
};
function Hero({ className }) {
  const classes = useStyles();
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
              منصة التجار
              <Logo width={170} ml={2} />
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInUp}>
              <Box component="p" sx={{ py: 3 }} className={classes.description}>
              أكبر تجمع لتجار قطع الغيار بالشرق الأوسط
              </Box>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
              >
                تسجيل الدخول
              </Button>
              <Button
                className={classes.whiteBtn}
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
              >
                إنشاء حساب
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
