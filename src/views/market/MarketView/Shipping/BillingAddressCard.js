import React, { } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    orderSummary: {
        padding: '0',
    },
    orderSummaryChild: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
    },
    orderSummaryNum: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium
    },
    orderSummaryTitle: {
        color: 'rgb(99, 115, 129)'
    }
}));

// ----------------------------------------------------------------------

function BillingAddressCard({ }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { billingAddress } = useSelector((state) => state.market);
    const isRlt = themeDirection == 'rtl';

    return (
        <>
            <List className={classes.orderSummary}>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Name")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {billingAddress.receiver}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Phone")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {billingAddress.phone}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Billing Address")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {billingAddress.address}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("City")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {isRlt ? billingAddress.location.city.nameAr : billingAddress.location.city.name}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Region")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {isRlt ? billingAddress.location.region.nameAr : billingAddress.location.region.name}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Country")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {isRlt ? billingAddress.location.country.nameAr : billingAddress.location.country.name}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
}

export default BillingAddressCard;
