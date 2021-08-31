import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    paddingLeft: theme.spacing(1.25),
    position: 'relative',
    '& .MuiListItemText-root': {
      flex: 'initial',
      paddingLeft: theme.spacing(1.25),
      [theme.breakpoints.up('md')]: {
        fontSize: theme.direction === 'ltr' ? theme.typography.caption.fontSize : theme.typography.body2.fontSize
      }
    },
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
    '& $svg path': {
      fill: theme.palette.grey[0],
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
  },
  notificationBadge: {
    background: theme.palette.primary.main,
    border: '1px solid #082C3C',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 10%)',
    width: '8px',
    height: '8px',
    display: 'block',
    position: 'absolute',
    left: theme.direction === 'rtl' ? '27px' : '12px',
    top: '27px',
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
  open = false,
  children,
  className,
  ...other
}) {
  const classes = useStyles();
  const [show, setShow] = useState(open);
  const [notifi, setNotifi] = useState(notification);
  const isSubItem = level > 0;

  const handleShow = () => {
    setShow((show) => !show);
  };

  const navActionFun = () => {
    if (notifi === true) {
      setNotifi(false);
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
          {notifi === true ? <span className={classes.notificationBadge}></span> : ''}
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
      onClick={navActionFun}
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
      {notifi === true ? <span className={classes.notificationBadge}></span> : ''}
      <ListItemText disableTypography primary={title} />

      {info && info}
    </ListItem>
  );
}

export default NavItem;
