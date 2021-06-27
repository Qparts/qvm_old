import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoints from 'src/hooks/useBreakpoints';
import {
  varFadeInUp,
  varFadeInDown,
  MotionInView,
  varFadeInRight
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Typography } from '@material-ui/core';
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
      color:theme.palette.secondary.dark,
    },
    headingWeight: {
      fontWeight: 800,
    },
    headingDisc: {
      fontSize: pxToRem(22),
      fontWeight: 700,
      color:theme.palette.grey[600],
    },
    catalougSec:{
      position: 'relative'
    },
    article: {
      zIndex: 1,
      position: 'absolute',
      transform: 'translate(0 , -50%)',
      left: 15,
      top:' 50%',
      [theme.breakpoints.up('md')]: {
        width: 'calc(60% - 80px)',
      },
 
    },
    articleHeading:{
      fontSize: pxToRem(38),
      color:theme.palette.secondary.dark,
      [theme.breakpoints.down('md')]: {
        fontSize:pxToRem(25),
      }
    },
    articleDisc:{
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
     display:'flex',
     [theme.breakpoints.up('md')]: {
      justifyContent:'flex-end',
     },
     [theme.breakpoints.down('md')]: {
      marginLeft: '-24px',
     }
    },
    catImage:{
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
  const isDesktop = useBreakpoints('up', 'lg');
  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <div className={classes.heading}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" align="center" className={classes.headingWeight}>
            المميزات
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              gutterBottom
              className={classes.headingDisc}
              variant="overline"
              align="center"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
             لدينا مجموعة متنوعة من الخدمات التي تسهل اعمالك اليومية
            </Typography>
          </MotionInView>
        </div>
        <Box position='relative'  width="100%">
          <Box position='absolute' className={classes.catalougSecBg} />
          <Grid container direction="row" justifyContent="center" >
            <Grid item lg={10} md={10} sm={12} className={classes.catalougSec}>
              <Box position='relative'>
                <article className={classes.article}>
                  <MotionInView variants={varFadeInRight}>
                                    <Typography variant="h3" mb={2} className={classes.articleHeading}>
                                      كتالوج لقطع غيار السيارات 
                                    </Typography>
                                    <p className={classes.articleDisc}>
                                    خبير قطع الغيار لا يمكنه الاستغناء عن الكتالوج ولذلك تم توفير هذه الميزه ليتمكن من تصفح العديد من كتالوجات السيارات المتاحة لدينا، والوصول للقطع المطلوبة بشكل أسهل والتأكد من شكلها، لتجاوز حدوث خطأ اثناء الطلب!!
                                    </p>
                  </MotionInView>
                </article>
                <MotionInView variants={varFadeInRight}>
                                  <picture className={classes.catImageAlign}>
                                      <source media="(max-width: 960px)" srcset="/static/images/cataloug-img-sm.png" />
                                      <img className={classes.catImage} src="/static/images/cataloug-img.png" />
                                  </picture>
                </MotionInView>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Catalog;
