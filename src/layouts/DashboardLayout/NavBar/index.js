import NavItem from './NavItem';
import MenuLinks from './config';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import React, { useEffect } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  Drawer,
  Hidden,
  ListSubheader,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 130;

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    drawer: {
      [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
      }
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: theme.palette.secondary.main,
      border: 'none'
    },
    subHeader: {
      ...theme.typography.overline,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      color: theme.palette.text.primary
    },
    doc: {
      padding: theme.spacing(2.5),
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: isLight
        ? alpha(theme.palette.primary.main, 0.08)
        : theme.palette.primary.lighter
    },
    textCent: {
      textAlign: 'center'
    }
  };
});

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level, t }) {
  const key = item.href + level;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    array = [
      ...array,
      <NavItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        notification={item.notification}
        title={t(item.title)}
        open={Boolean(match)}
      >
        {renderNavItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </NavItem>
    ];
  } else {
    array = [
      ...array,
      <NavItem
        key={key}
        level={level}
        href={item.href}
        icon={item.icon}
        info={item.info}
        notification={item.notification}
        title={t(item.title)}
      />
    ];
  }
  return array;
}

function renderNavItems({ items, pathname, level = 0, t }) {
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level, t }),
        []
      )
      }
    </List>
  );
}

NavBar.propTypes = {
  onCloseNav: PropTypes.func,
  isOpenNav: PropTypes.bool
};

function NavBar({ isOpenNav, onCloseNav }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { pathname } = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    if (isOpenNav && onCloseNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbars>
      <Box sx={{ px: 2.5, py: 3 }}>
        <RouterLink to="/">
          <Logo style={{margin: 'auto'}} />
        </RouterLink>
      </Box>

      {/* <Link
        underline="none"
        component={RouterLink}
        to={PATH_APP.management.user.account}
      >
        <div className={classes.account}>
          <MyAvatar />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {user.role}
            </Typography>
          </Box>
        </div>
      </Link> */}

      {MenuLinks.map((list, index) => (
        <List
          disablePadding
          key={index}
          className={classes.textCent}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              className={classes.subHeader}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderNavItems({
            items: list.items,
            pathname: pathname,
            t
          })}
        </List>
      ))}
    </Scrollbars>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={isOpenNav}
          variant="temporary"
          onClose={onCloseNav}
          classes={{ paper: classes.drawerPaper }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          anchor="left"
          variant="persistent"
          classes={{ paper: classes.drawerPaper }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default NavBar;
