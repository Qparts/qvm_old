import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import {
  getCards,
  getProfile,
  getInvoices,
  getAddressBook,
  getNotifications
} from 'src/redux/slices/user';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Tab, Box, Tabs } from '@material-ui/core';
import BrancheView from './Branch';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    marginBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

function AccountView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('Branches');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    cards,
    invoices,
    myProfile,
    addressBook,
    notifications
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  if (!myProfile) {
    return null;
  }

  if (!cards) {
    return null;
  }

  if (!notifications) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: 'Branches',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <BrancheView />
    },
    // {
    //   value: 'general',
    //   icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    //   component: <General />
    // },
    // {
    //   value: 'billing',
    //   icon: <Icon icon={roundReceipt} width={20} height={20} />,
    //   component: (
    //     <Billing cards={cards} addressBook={addressBook} invoices={invoices} />
    //   )
    // },
    // {
    //   value: 'notifications',
    //   icon: <Icon icon={bellFill} width={20} height={20} />,
    //   component: <Notifications notifications={notifications} />
    // },
    // {
    //   value: 'social_links',
    //   icon: <Icon icon={shareFill} width={20} height={20} />,
    //   component: <SocialLinks myProfile={myProfile} />
    // },
    // {
    //   value: 'change_password',
    //   icon: <Icon icon={roundVpnKey} width={20} height={20} />,
    //   component: <ChangePassword />
    // }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page
      title="Account Settings-Management | Minimal-UI"
      className={classes.root}
    >
      <Container>
        {/* <HeaderDashboard
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'User', href: PATH_APP.management.user.root },
            { name: 'Account Settings' }
          ]}
        /> */}

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
          className={classes.tabBar}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={t(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

export default AccountView;
