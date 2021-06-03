import React from 'react';
import {
  Box,
  Link,
  Button,
  Container,
} from '@material-ui/core';
import Languages from '../DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';
import { makeStyles} from '@material-ui/core/styles';
import './home.scss';

// ----------------------------------------------------------------------


const useStyles = makeStyles((theme) => ({
  root: {
      color:"red"
  },

}));

// ----------------------------------------------------------------------

function HomeSections() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.root}>
    
    </Box>
  );
}

export default HomeSections;
