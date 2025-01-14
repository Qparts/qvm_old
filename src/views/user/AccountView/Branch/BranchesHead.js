import React, { useState } from 'react';
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Box, Tabs, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import BranchesItemsSection from './BrancheItemsSection';
import UsersItemsSection from './UsersItemsSection';
import BrancheActionsSection from './BrancheActionsSection';
import paymentService from 'src/services/paymentService';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    tabBar: {
        background: theme.palette.grey[0],
        '& .rtl-277bjs-MuiButtonBase-root-MuiTab-root:not(:last-child), & .css-1t7r562-MuiButtonBase-root-MuiTab-root:not(:last-child)': {
            marginLeft: '15px'
        },
        '& .rtl-277bjs-MuiButtonBase-root-MuiTab-root.Mui-selected, & .css-1t7r562-MuiButtonBase-root-MuiTab-root.Mui-selected': {
            '& .MuiTypography-body3:last-of-type': {
                background: '#FFEDED',
                color: theme.palette.primary.main
            }
        }
    },
    tab: {
        fontWeight: theme.typography.fontWeightRegular,
        '&:not(:last-child)': {
            marginRight: '40px'
        },
    },
    tabNumber: {
        background: '#F6F8FC',
        borderRadius: '30px',
        width: '30px',
        height: '30px',
        marginLeft: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
}));

// ----------------------------------------------------------------------

function BranchesHead() {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { loginObject } = useSelector((state) => state.authJwt);
    const { branches } = useSelector((state) => state.branches);
    const [currentTab, setCurrentTab] = useState('branches');
    const [addBranchIsOpen, setAddBranchIsOpen] = useState(false);
    const [addUserIsOpen, setAddUserIsOpen] = useState(false);

    const branchesLength = branches.length;
    const usersLength = loginObject.company.subscribers.length;
    const validSubscriptions = loginObject.company.subscriptions.filter(e => e.status != 'F');
    const branchesNum = validSubscriptions[0].subscriptionBranches.filter(e => e.branchId === null).length;
    const usersNum = validSubscriptions[0].subscriptionUsers.filter(e => e.subscriberId === null).length;

    const checkPendingSubscriptions = async (user, num) => {
        try {
            if (validSubscriptions[0].status !== 'A') {
                const { data: pendingSubscriptions } = await paymentService.getPendingSubscription();
                if (pendingSubscriptions != null && pendingSubscriptions != "")
                    enqueueSnackbar(t('There is a pending subscription'), { variant: 'warning' });
                else history.push(PATH_APP.general.upgradeSubscription)
            } else {
                if (num === 0) {
                    const { data: pendingSubscriptions } = await paymentService.getPendingSubscription();
                    if (pendingSubscriptions != null && pendingSubscriptions != "")
                        enqueueSnackbar(t('There is a pending subscription'), { variant: 'warning' });
                    else
                        if (user) setAddUserIsOpen(true)
                        else setAddBranchIsOpen(true)
                } else {
                    if (user) setAddUserIsOpen(true)
                    else setAddBranchIsOpen(true)
                }
            }
        } catch (error) {
            enqueueSnackbar(t('There was an error please try again later'), { variant: 'error' });
        }
    }

    const branchesTitle = (
        <Box>
            <Typography variant="body3"> {t("Branches")}</Typography>
            <Typography variant="body3" className={classes.tabNumber}> {branchesLength}</Typography>
        </Box>
    )

    const usersTitle = (
        <Box>
            <Typography variant="body3"> {t("Users")}</Typography>
            <Typography variant="body3" className={classes.tabNumber}> {usersLength} </Typography>
        </Box>
    )

    const ACCOUNT_TABS = [
        {
            value: 'branches',
            label: branchesTitle,
            component: <BranchesItemsSection
                branchesNum={branchesNum}
                openAddBranchModel={() => checkPendingSubscriptions(false, branchesNum)} />
        },
        {
            value: 'Users',
            label: usersTitle,
            component: <UsersItemsSection
                usersNum={usersNum}
                openAddUserModel={() => checkPendingSubscriptions(true, usersNum)} />
        },
    ];

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <>
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
                        label={tab.label}
                        value={tab.value}
                        className={classes.tab}
                    />
                ))}
            </Tabs>

            <BrancheActionsSection
                addBranchIsOpen={addBranchIsOpen}
                setAddBranchIsOpen={setAddBranchIsOpen}
                addUserIsOpen={addUserIsOpen}
                setAddUserIsOpen={setAddUserIsOpen}
                branchesNum={branchesNum}
                usersNum={usersNum}
                openAddBranchModel={() => checkPendingSubscriptions(false, branchesNum)}
                openAddUserModel={() => checkPendingSubscriptions(true, usersNum)} />

            {ACCOUNT_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
        </>
    );
}

export default BranchesHead;
