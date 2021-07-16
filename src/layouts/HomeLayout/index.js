import React from 'react';
import TopBar from './TopBar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: { height: '100%' },
  content: {
    minHeight: '100%',
    background: theme.palette.grey[0],
  },
}));

// ----------------------------------------------------------------------

HomeLayout.propTypes = {
  children: PropTypes.node
};

function HomeLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <Box display='flex' flexDirection="column" className={classes.content}>{children}</Box>
      <Footer />

    </div>
  );
}

export default HomeLayout;
