import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import NavBar from './NavBar';
import TopBar from './TopBar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
    background: '#082C3C',
  },
  main: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 18,
    paddingBottom: theme.spacing(4),
    background: '#F6F8FC',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 18,
      margin: theme.spacing(0, 1, 1, 0),
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    }
  },
  chatPadding: {
    padding: '64px 0 0 0',
    [theme.breakpoints.up('lg')]: {
      padding: '69px 0 0 0'
    }
  }
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node
};

function DashboardLayout({ children }) {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onOpenNav={() => setOpenNav(true)} />
      <NavBar onCloseNav={() => setOpenNav(false)} isOpenNav={openNav} />

      <div className={clsx(classes.main)}>{children}</div>
    </div>
  );
}

export default DashboardLayout;
