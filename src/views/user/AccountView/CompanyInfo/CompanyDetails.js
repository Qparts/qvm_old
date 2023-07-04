import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import helper from 'src/utils/helper';
import { Company, Location, Parts, Calender } from '../../../../icons/icons';
import { getDashboardMetrics } from 'src/redux/slices/dashboard';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    companyDetailsIcon: {
        background: theme.palette.grey[0],
        boxShadow: '0px 2px 4px rgb(0 0 0 / 3%)',
        width: '74px',
        height: '74px',
        borderRadius: '50%',
        lineHeight: '97px',
        textAlign: 'center',
    },
    companyDetailsCont: {
        marginLeft: '15px'
    },
    companyName: {
        lineHeight: 1,
        marginBottom: '10px'
    },
    CompanyDetailsCaption: {
        color: '#7E8D99',
        margin: '0 5px'
    },
    companyDetailsChild: {
        marginLeft: theme.spacing(1.25),
        '@media (max-width: 715px) and (min-width: 600px)': {
            margin: theme.spacing(0.75, 0, 0)
        },
        '@media (max-width: 370px)': {
            margin: theme.spacing(0.75, 0, 0)
        },
    },
    companyInfo: {
        '@media (max-width: 715px) and (min-width: 600px)': {
            display: 'block !important',
        },
        '@media (max-width: 370px)': {
            display: 'block !important',
        },
    },
    partsMb: {
        marginBottom: '7px'
    },
    companyDetailsFlex: {
        display: 'flex',
        alignItems: 'center',
    },
    companyDetailsFlexStart: {
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        },
    },
}));

// ----------------------------------------------------------------------

function CompanyDetails() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user, loginObject, countries } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);
    const { numOfStockParts, numOfParts } = useSelector((state) => state.dashboard);
    const userCountry = countries.find((e) => e.id === loginObject.company.countryId);

    useEffect(() => {
        if (numOfParts === 0) {
            dispatch(getDashboardMetrics());
        }
    }, []);

    return (
        <Box className={clsx(classes.companyDetailsFlex, classes.companyDetailsFlexStart)}>
            <Box className={classes.companyDetailsIcon}>
                <Company width='27' height='34' fill='#7E8D99' />
            </Box>
            <Box className={classes.companyDetailsCont}>
                <Typography variant="h5" className={classes.companyName}>
                    {themeDirection == 'ltr' ? user.company.name : user.company.nameAr}
                </Typography>
                <Box className={clsx(classes.companyDetailsFlex, classes.partsMb)}>
                    <Parts width='18' height='18' fill='#7E8D99' />
                    <Box className={classes.companyDetailsFlex}>
                        <Typography variant="caption" className={classes.CompanyDetailsCaption}> {t("parts number in your stock")}</Typography>
                        <Typography variant="subtitle1"> {numOfStockParts} </Typography>
                    </Box>
                </Box>
                <Box className={clsx(classes.companyInfo, classes.companyDetailsFlex)}>
                    <Box className={classes.companyDetailsFlex}>
                        <Location width='16' height='16' fill='#7E8D99' style={{ margin: themeDirection === 'ltr' ? '0 5px 0 0' : '0 0 0 5px' }} />
                        <Typography variant="subtitle2"> {themeDirection == 'ltr' ? userCountry.name : userCountry.nameAr} </Typography>
                    </Box>
                    <Box className={clsx(classes.companyDetailsFlex, classes.companyDetailsChild)}>
                        <Calender width='16' height='16' fill='#7E8D99' />
                        <Box className={classes.companyDetailsFlex}>
                            <Typography variant="caption" className={classes.CompanyDetailsCaption}> {t("since")}</Typography>
                            <Typography variant="subtitle2"> {helper.toDate(user.company.subscriptions[0].created)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CompanyDetails;
