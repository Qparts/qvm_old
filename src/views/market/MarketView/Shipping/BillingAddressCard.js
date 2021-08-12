import React, {  } from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    Box,
    Typography
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},

    value: {
        color: '#526C78',
    },
}));

// ----------------------------------------------------------------------

function BillingAddressCard({ }) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { billingAddress } = useSelector((state) => state.market);
    const isRlt = themeDirection == 'rtl';

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Name")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {billingAddress.receiver}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Phone")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {billingAddress.phone}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Billing Address")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {billingAddress.address}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("City")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {isRlt ? billingAddress.location.city.nameAr : billingAddress.location.city.name}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Region")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {isRlt ? billingAddress.location.region.nameAr : billingAddress.location.region.name}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Country")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {isRlt ? billingAddress.location.country.nameAr : billingAddress.location.country.name}</Typography>
                </Grid>

            </Grid>

            <Box sx={{ mb: 3 }} />
        </>
    );
}

export default BillingAddressCard;
