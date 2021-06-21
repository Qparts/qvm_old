import React from 'react';
import SearchedParts from './SearchedParts';
import Page from 'src/components/Page';
import QvmInfo from './QvmInfo';
import UserInfo from './UserInfo';
import SearchedCatalog from './SearchedCatalog';
import Advertisement from '../../../components/Ui/Advertise';
import SecContainer from '../../../components/Ui/SecContainer';
import Offer from '../../../components/Ui/Offer';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { Parts, SearchFill, Orders, Search } from '../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page title="Dashboard App | Minimal-UI" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={4}>
                <QvmInfo
                  icon={<Parts width='32' height='32' fill='#F20505' />}
                  title={t('qvm parts')}
                  number='15.000' />
              </Grid>

              <Grid item xs={12} md={4}>
                <QvmInfo
                  icon={<SearchFill width='32' height='32' fill='#F20505' />}
                  title={t('daily searches')}
                  number='569.000' />
              </Grid>

              <Grid item xs={12} md={4}>
                <QvmInfo
                  icon={<Orders width='32' height='32' fill='#9ABECD' fillArr='#fff'/>}
                  title={t('qvm orders')}
                  number='195.000'
                  active='active' />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Advertisement
                  url='/static/icons/ic_chrome.svg'
                  width='728'
                  height='90' />
              </Grid>

              <Grid item xs={12}>
                <SecContainer
                  header={t('latest offers')}
                  icon={<Search width='20' height='20' fill='#F20505' />}
                  footer={t('see all offers')}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Offer
                        company='الخليفة لقطع الغيار'
                        offer='special offers break pad'
                        date='5-31-2021'
                        partsNum='820'
                        discount='50%'
                        timeLeft='20%'
                        width='20%' />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Offer
                        company='الخليفة لقطع الغيار'
                        offer='special offers break pad'
                        date='5-31-2021'
                        partsNum='820'
                        discount='50%'
                        timeLeft='70%'
                        width='70%' />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Offer
                        company='الخليفة لقطع الغيار'
                        offer='special offers break pad'
                        date='3-31-2021'
                        partsNum='820'
                        discount='50%'
                        timeLeft='95%'
                        width='95%' />
                    </Grid>
                  </Grid>
                </SecContainer>
              </Grid>

              <Grid item xs={12} md={8}>
                <SecContainer
                  header={t('The most searched parts on QVM')}
                  icon={<Search width='20' height='20' fill='#F20505' />}
                  footer={t('Find the parts you need')}>
                  <SearchedParts />
                </SecContainer>
              </Grid>

              <Grid item xs={12} md={4}>
                <SearchedCatalog />
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container>
              <Grid item xs={12}>
                <UserInfo />
                <Advertisement
                  url='/static/icons/ic_chrome.svg'
                  width='300'
                  height='250' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAppView;
