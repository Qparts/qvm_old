import clsx from 'clsx';
import React from 'react';
import Search from './Search';
import Account from './Account';
import PropTypes from 'prop-types';
import Languages from './Languages';
import { Icon } from '@iconify/react';
import Notifications from './Notifications';
import UploadStockBtn from '../../../components/Ui/UploadStockBtn';
import Orders from './Orders';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 130;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 69;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
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

function TopBar({ onOpenNav, className }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary'
            }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        <Search />
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *': {
              ml: {
                xs: 0.5,
                sm: 2,
                lg: 3
              }
            }
          }}
        >
          <Hidden smDown>
            <UploadStockBtn bg={theme.palette.primary.main} color={theme.palette.grey[0]} />
          </Hidden>
          <Languages />
          <Orders />
          <Notifications />
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
