import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  className: PropTypes.string
};

function Logo({ className, ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/icons/QVM-whiteV.svg"
      width={100}
      className={className}
      {...other}
    />
  );
}

export default Logo;