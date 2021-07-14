import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
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

function OrderSummary({ }) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { cartItems } = useSelector((state) => state.market);
    const [price, setPrice] = useState(0);
    const [shippingCost, setShippingCost] = useState(50);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const isRlt = themeDirection == 'rtl';

    useEffect(() => {
        let total = getPrice();
        const subTotalvalue = total + shippingCost;
        const taxValue = subTotalvalue * .15
        setPrice(total);
        setSubtotal(subTotalvalue);
        setTax(taxValue);
        setTotalPrice(subTotalvalue + taxValue);
    }, [cartItems]);

    const getPrice = () => {
        let totalPrice = 0;
        for (var item of cartItems) {
            totalPrice += item.quantity * item.product.price;
        }
        return totalPrice;
    }

    return (
        <>
            <Typography variant="body4" className={classes.value}> {cartItems.length} {t('Product')}</Typography>

            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Total Price")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {price} {t("SAR")}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Shipping Cost")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {shippingCost} {t("SAR")}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Subtotal")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {subtotal} {t("SAR")}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Tax")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {tax} {t("SAR")}</Typography>
                </Grid>

                <Grid item md={8}>
                    <Typography variant="subtitle1">   {t("Total Price")}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="body4" className={classes.value}> {totalPrice} {t("SAR")}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default OrderSummary;
