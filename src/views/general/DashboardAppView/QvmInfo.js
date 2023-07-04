import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4, 2.5),
    boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
    border: '1px solid #E7F0F7',
  },
  widgetIcon: {
    width: 63,
    height: 63,
    textAlign: 'center',
    lineHeight: '83px',
    borderRadius: 63,
    background: 'rgb(242 5 5 / 10%)',
  },
  qvmNumbers: {
    textAlign: 'left'
  },
  fontWeightLight: {
    fontWeight: 400
  },
  active: {
    background: 'linear-gradient(107.53deg, #082C3C 1.57%, #164E67 74.34%)',
    color: theme.palette.grey[0],
    '& $widgetIcon': {
      background: 'rgb(154 190 205 / 10%)'
    }
  }
}));

// ----------------------------------------------------------------------

QvmInfo.propTypes = {
  className: PropTypes.string
};

function QvmInfo(props, { className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, classes[props.active], className)} {...other}>
      <Box className={classes.qvmNumbers} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{props.title}</Typography>
        <Typography variant="h3" className={classes.fontWeightLight}>{props.number}</Typography>
      </Box>
      <Box className={classes.widgetIcon}> {props.icon} </Box>
    </Card>
  );
}

export default QvmInfo;
