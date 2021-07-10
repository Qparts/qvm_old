import clsx from 'clsx';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import { PATH_PAGE } from 'src/routes/paths';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Container, Typography, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// ----------------------------------------------------------------------

const MENU_LINKS = [
  { title: 'سياسة الخصوصية', href: PATH_PAGE.common.privacy },
  { title: ' اتفاقية الاستخدام', href: PATH_PAGE.common.termsView },
];

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.main,
    padding: theme.spacing(1, 0),

  },
  headingDisc: {
    opacity: 0.5
  },
  footerLink: {
    color: theme.palette.grey[0],
    opacity: 0.5,
    "&:hover": {
      textDecoration: 'none',
      opacity: 1,
    }
  },
  plusLink: {
    '& a:last-of-type': {
      borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
      marginLeft: 10,
      paddingLeft: 10,
    }
  }
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  className: PropTypes.string
};

function Footer({ className }) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} position='relative'>
      <Container maxWidth="lg">
        <Grid container spacing={2} >
          <Hidden only={['sm', 'xs']}>
            <Grid item md={4} display="flex" alignItems="center" only="sm">
              {/* <Link href="#" className={classes.footerLink}>
                سياسة الخصوصية
              </Link>
              <span className={classes.plusLink}>
                <Link href="#" className={classes.footerLink}>
                  اتفاقية الاستخدام
                </Link>
              </span> */}
              <span className={classes.plusLink}>
                {MENU_LINKS.map((link) => (
                  <Link
                    exact
                    to={link.href}
                    key={link.title}
                    underline="none"
                    component={RouterLink}
                    className={classes.footerLink}
                  >
                    {link.title}
                  </Link>
                ))}
              </span>

            </Grid>
          </Hidden>

          <Grid item md={4} display="flex" alignItems="center">
            <Typography
              gutterBottom
              align="center"
              sx={{ color: 'common.white', display: 'block' }}
              variant="body1"
              mb={0}
            >
              <span className={classes.headingDisc}>2020@ جميع الحقوق محفوظة لشركة </span> q.parts
            </Typography>
          </Grid>
          <Hidden only={['sm', 'xs']}>
            <Grid item md={4} display="flex" alignItems="center" justifyContent="flex-end">
              <Logo width={80} />
            </Grid>
          </Hidden>

        </Grid>
      </Container>
    </Box>

  );
}

export default Footer;
