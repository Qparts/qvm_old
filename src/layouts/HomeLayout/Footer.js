import clsx from 'clsx';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/Logo';
import { PATH_PAGE } from 'src/routes/paths';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Container, Typography, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// ----------------------------------------------------------------------

const MENU_LINKS = [
  { title: 'Privacy Policy', href: PATH_PAGE.common.privacy },
  { title: 'Terms of Use', href: PATH_PAGE.common.termsView },
];

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.main,
    padding: theme.spacing(1, 0),
    '& p': {
      '@media (max-width: 985px) and (min-width: 960px)': {
        fontSize: '0.968rem',
      }
    }

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
  },
  rightsReserved: {
    color: theme.palette.grey[0],
    display: 'block',
    textAlign: 'left',
    margin: theme.spacing(1.625, 0, 0),
  }
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  className: PropTypes.string
};

function Footer({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)} position='relative'>
      <Container maxWidth="lg">
        <Grid container spacing={2} >
          <Hidden only={['sm', 'xs']}>
            <Grid item md={4} display="flex" alignItems="center" only="sm">
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
                    {t(link.title)}
                  </Link>
                ))}
              </span>

            </Grid>
          </Hidden>

          <Grid item xs={12} md={6}>
            <Typography className={classes.rightsReserved} variant="body1">
              <span className={classes.headingDisc}> {t("All rights reserved for company")} </span>  Tatbiq Qata' <span className={classes.headingDisc}> {t("for trading")} </span> @ 2021
            </Typography>
          </Grid>
          <Hidden only={['sm', 'xs']}>
            <Grid item md={2}>
              <Logo newLogo='newLogo' root='root' />
            </Grid>
          </Hidden>

        </Grid>
      </Container>
    </Box>

  );
}

export default Footer;
