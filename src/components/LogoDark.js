import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

LogoDark.propTypes = {
    className: PropTypes.string
};

function LogoDark({ className, ...other }) {
    return (
        <Box
            component="img"
            alt="logo"
            src="/static/images/QVM.svg"
            width={100}
            className={className}
            {...other}
        />
    );
}

export default LogoDark;
