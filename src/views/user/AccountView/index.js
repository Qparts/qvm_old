import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import BrancheView from './Branch';
import SubscriptionView from './Subscription';
import CompanyInfo from './CompanyInfo';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function AccountView() {
  const classes = useStyles();

  return (
    <Page
      title="Account Settings-Management | Minimal-UI"
      className={classes.root}
    >
      <CompanyInfo />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <BrancheView />
        </Grid>
        <Grid item xs={12} md={3}>
          <SubscriptionView />
        </Grid>
      </Grid>
    </Page>
  );
}

export default AccountView;
