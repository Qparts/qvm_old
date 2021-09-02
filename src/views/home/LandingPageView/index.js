import React from 'react';
import Hero from './Hero';
import Catalog from './Catalog';
import PartAvailability from './PartAvailability';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import Benefits from './Benefits';
import NewsLetter from './NewsLetter';
import Brands from './Brands';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));

function LandingPageView() {
  const classes = useStyles();

  return (
    <Page
      title="QVM"
      id="move_top"
      className={classes.root}
    >
      <Hero />
      <div className={classes.content}>
        <Catalog />
        <PartAvailability />
        <Benefits />
        <NewsLetter />
        <Brands />
      </div>
    </Page>
  );
}

export default LandingPageView;
