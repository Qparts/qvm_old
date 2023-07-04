import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';
import BrancheView from './Branch';
import SubscriptionView from './Subscription';
import CompanyInfo from './CompanyInfo';

// ----------------------------------------------------------------------

function AccountView() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const location = useLocation();
  const history = useHistory();
  const { loginObject } = useSelector((state) => state.authJwt);

  const tapId = new URLSearchParams(location.search).get("tap_id");

  useEffect(() => {
    if (tapId) {
      helper.updatePaymentOrder(history, PATH_APP.management.user.account, tapId, loginObject, dispatch, enqueueSnackbar, closeSnackbar, t);
    }
  }, [tapId]);

  return (
    <Page title={t("Account Settings Management")}>
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
