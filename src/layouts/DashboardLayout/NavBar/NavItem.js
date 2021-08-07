import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import helper from 'src/utils/helper';
import { PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    ...theme.typography.body2,
    width: 'auto',
    lineHeight: '1.3',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#a2b4bd',
    display: 'inline-block',
    position: 'relative',
    '&:hover': {
      color: theme.palette.grey[0],
      '& $svg path': {
        fill: theme.palette.grey[0]
      }
    }
  },
  listIcon: {
    display: 'block',
    margin: 0
  },
  subIcon: {
    width: 24,
    height: 24,
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    '&:before': {
      width: 4,
      height: 4,
      content: "''",
      display: 'block',
      borderRadius: '50%',
      backgroundColor: theme.palette.text.disabled,
      transition: theme.transitions.create('transform')
    }
  },
  isActiveListItem: {
    color: theme.palette.grey[0] + '!important',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: '15px 16px 13px',
    '& $svg path': {
      fill: theme.palette.grey[0],
    },
    '& $notificationBadge': {
      backgroundColor: theme.palette.grey[0],
      right: '23px',
      bottom: '32px',
    }
  },
  isActiveListItemSub: {
    color: theme.palette.grey[0] + '!important',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: '15px 16px 13px',
    '& $svg path': {
      fill: theme.palette.grey[0],
    },
    '& $subIcon:before': {
      transform: 'scale(2)',
      backgroundColor: theme.palette.primary.main,
    },
    '& $notificationBadge': {
      backgroundColor: theme.palette.grey[0],
      right: '23px',
      bottom: '32px',
    }
  },
  notificationBadge: {
    background: theme.palette.primary.main,
    border: '1px solid #082C3C',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 10%)',
    width: '8px',
    height: '8px',
    display: 'block',
    position: 'absolute',
    right: theme.direction === 'rtl' ? 0 : '5px',
    bottom: '27px',
    borderRadius: '50%',
  }
}));

// ----------------------------------------------------------------------

NavItem.propTypes = {
  level: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  info: PropTypes.element,
  icon: PropTypes.element,
  open: PropTypes.bool,
  notification: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

function NavItem({
  level,
  title,
  href,
  info,
  icon,
  notification,
  logoutAttr,
  open = false,
  children,
  className,
  ...other
}) {
  const classes = useStyles();
  const [show, setShow] = useState(open);
  const history = useHistory();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const isSubItem = level > 0;

  const handleShow = () => {
    setShow((show) => !show);
  };

  const logoutFun = () => {
    if (logoutAttr) {
      helper.handleLogout(logout, dispatch, isMountedRef, history, PATH_PAGE.auth.login, enqueueSnackbar);
    }
  }

  if (children) {
    return (
      <>
        <ListItem
          button
          disableGutters
          onClick={handleShow}
          className={clsx(
            classes.listItem,
            {
              [classes.isActiveListItem]: open
            },
            className
          )}
          {...other}
        >
          <ListItemIcon>{icon && icon}</ListItemIcon>
          {notification ? <span className={classes.notificationBadge}></span> : ''}
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={show ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItem>

        <Collapse in={show}>{children}</Collapse>
      </>
    );
  }

  return (
    <ListItem
      button
      to={href}
      exact={open}
      onClick={logoutFun}
      disableGutters
      component={RouterLink}
      activeClassName={
        isSubItem ? classes.isActiveListItemSub : classes.isActiveListItem
      }
      className={clsx(classes.listItem, className)}
      isActive={(match, location) => {
        if (!match) {
          return false;
        }
        const { url } = match;
        const { pathname } = location;
        const isMatch = url === pathname;

        if (!isSubItem) {
          return url.length && pathname.includes(url);
        }

        return isMatch;
      }}
      {...other}
    >
      <ListItemIcon className={classes.listIcon}>
        {isSubItem ? <span className={classes.subIcon} /> : icon}
      </ListItemIcon>
      {notification ? <span className={classes.notificationBadge}></span> : ''}
      <ListItemText disableTypography primary={title} />

      {info && info}
    </ListItem>
  );
}

export default NavItem;
