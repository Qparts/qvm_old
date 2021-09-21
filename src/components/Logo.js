import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: { marginLeft: 'auto' },
}));

// ----------------------------------------------------------------------


Logo.propTypes = {
  className: PropTypes.string
};

function Logo({ className, root, newLogo, ...other }) {
  const classes = useStyles();

  return (
    <Box
      component="img"
      alt="logo"
      src={newLogo ? "/static/images/QVM-white.png" : "/static/icons/QVM-whiteV.svg"}
      width={newLogo ? 'auto' : 100}
      className={clsx(className, classes[root])}
      {...other}
    />
  );
}

export default Logo;
