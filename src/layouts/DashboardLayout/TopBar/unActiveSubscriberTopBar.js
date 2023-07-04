import clsx from 'clsx';
import React from 'react';
import Account from './Account';
import PropTypes from 'prop-types';
import Languages from './Languages';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar } from '@material-ui/core';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 130;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 69;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: DRAWER_WIDTH
    }
  },
  toolbar: {
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 5)
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP
    }
  }
}));

// ----------------------------------------------------------------------

TopBar.propTypes = {
  onOpenNav: PropTypes.func,
  className: PropTypes.string
};

function TopBar({ className }) {
  const classes = useStyles();
  
  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *': {
              ml: {
                xs: 0,
                sm: 2,
                lg: 3
              }
            }
          }}
        >
          <Languages />
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
