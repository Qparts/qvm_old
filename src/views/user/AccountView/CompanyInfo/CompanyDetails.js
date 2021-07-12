import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import helper from 'src/utils/helper';
import { Company, Location, Parts, Calender } from '../../../../icons/icons';

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
        marginLeft: '10px'
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
    },
}));

// ----------------------------------------------------------------------

function CompanyDetails() {
    const classes = useStyles();
    const { t } = useTranslation();

    const { user } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);

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
                        <Typography variant="subtitle1"> 500</Typography>
                    </Box>
                </Box>
                <Box className={classes.companyDetailsFlex}>
                    <Box className={classes.companyDetailsFlex}>
                        <Location width='16' height='16' fill='#7E8D99' style={{ margin: themeDirection === 'ltr' ? '0 5px 0 0' : '0 0 0 5px' }} />
                        <Typography variant="subtitle2"> السعودية</Typography>
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
