import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Box, Tabs, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BranchesItemsSection from './BrancheItemsSection';
import UsersItemsSection from './UsersItemsSection';

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
    const { loginObject } = useSelector((state) => state.authJwt);
    const { branches } = useSelector((state) => state.branches);
    const [currentTab, setCurrentTab] = useState('branches');
    const { t } = useTranslation();
    const branchesLength = branches.length;
    const usersLength = loginObject.company.subscribers.length;

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
            component: <BranchesItemsSection />
        },
        {
            value: 'Users',
            label: usersTitle,
            component: <UsersItemsSection />
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

            {ACCOUNT_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
        </>
    );
}

export default BranchesHead;
