import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SearchedParts from './SearchedParts';
import Page from 'src/components/Page';
import QvmInfo from './QvmInfo';
import UserInfo from './UserInfo/index';
import SearchedCatalog from './SearchedCatalog';
import PartsSearchRate from './PartsSearchRate';
import MostSearchedParts from './MostSearchedParts';
import MostReactiveCompanies from './MostReactiveCompanies';
import Advertisement from '../../../components/Ui/Advertise';
import SecContainer from '../../../components/Ui/SecContainer';
import { Parts, SearchFill, Orders, Search, Upload, Plus } from '../../../icons/icons';
import { getSpecialOffersLive } from 'src/redux/slices/specialOffer';
import { PATH_APP } from 'src/routes/paths';
import OfferContainer from '../../../components/Ui/OfferContainer'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  sideStyle: {
    [theme.breakpoints.up('lg')]: {
      right: -15,
    }
  }
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  const { specialOffers = [] } = useSelector((state) => state.specialOffer);

  useEffect(() => {
    if (specialOffers.length == 0) {
      dispatch(getSpecialOffersLive());
    }
  }, []);

  return (
    <Page title="Dashboard App | Minimal-UI" className={classes.root}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>

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
                icon={<Orders width='32' height='32' fill='#9ABECD' fillArr='#fff' />}
                title={t('qvm orders')}
                number='195.000'
                active='active' />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Advertisement
                url='/static/images/banner90.jpg'
                width='728px'
                height='90px'
                advertiseMt="advertiseMt" />
            </Grid>

            <Grid item xs={12}>
              <SecContainer
                header={t('latest offers')}
                path={PATH_APP.general.specialOffer}
                icon={<Plus width='10' height='10' fill='#F20505' />}
                footer={t('see all offers')}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <OfferContainer />
                  </Grid>
                </Grid>
              </SecContainer>
            </Grid>

            <Grid item xs={12} md={8}>
              <SecContainer
                header={t('The most searched parts on QVM')}
                icon={<Search width='20' height='20' fill='#F20505' />}
                footer={t('Find the parts you need')}
                bodyP="bodyP">
                <SearchedParts />
              </SecContainer>
            </Grid>

            <Grid item xs={12} md={4}>
              <SearchedCatalog />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} md={3} position="relative" className={classes.sideStyle}>
          <UserInfo />
          <Advertisement
            url='/static/images/banner-300.jpg'
            width='100%'
            height='250px'
            advertiseMt="advertiseMt" />
        </Grid>
      </Grid>



      {/* <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>

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
                  icon={<Orders width='32' height='32' fill='#9ABECD' fillArr='#fff' />}
                  title={t('qvm orders')}
                  number='195.000'
                  active='active' />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <PartsSearchRate />
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container>
              <Grid item xs={12}>
                <UserInfo />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <SecContainer
              header={t('Most searched parts in your stock')}
              icon={<Upload width='20' height='20' fill='#F20505' />}
              footer={t('upload stock')}
              bodyP="bodyP">
              <MostSearchedParts />
            </SecContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <SecContainer
              header={t('Most reactive companies in your stock')}
              icon={<Upload width='20' height='20' fill='#F20505' />}
              footer={t('more')}
              bodyP="bodyP">
              <MostReactiveCompanies />
            </SecContainer>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
              <Advertisement
                url='/static/images/banner90.jpg'
                width='728px'
                height='90px'
                advertiseMt="advertiseMt" />
          </Grid>

          <Grid item xs={12}>
            <SecContainer
              header={t('latest offers')}
              icon={<Plus width='10' height='10' fill='#F20505' />}
              footer={t('see all offers')}>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <OfferContainer />
                  </Grid>
              </Grid>
            </SecContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <SecContainer
              header={t('The most searched parts on QVM')}
              icon={<Search width='20' height='20' fill='#F20505' />}
              footer={t('Find the parts you need')}
              bodyP="bodyP">
              <SearchedParts />
            </SecContainer>
          </Grid>

          <Grid item xs={12} md={3}>
            <SearchedCatalog />
          </Grid>

          <Grid item xs={12} md={3} className={classes.sideStyle}>
                <Advertisement
                  url='/static/images/banner-300.jpg' 
                  width='100%'
                  height='250px'
                  advertiseMt="advertiseMt"/>
          </Grid>
        </Grid> */}

    </Page>
  );
}

export default DashboardAppView;
