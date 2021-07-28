import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    cartItemsLength: {
        paddingBottom: '20px',
        marginBottom: '10px',
        borderBottom: '1px solid #ECF1F5',
        display: 'block'
    },
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
    },
}));

// ----------------------------------------------------------------------

function OrderSummary({ }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { cartItems } = useSelector((state) => state.market);
    const [price, setPrice] = useState(0);
    const [shippingCost, setShippingCost] = useState(50);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

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
            <Typography variant="body41" className={clsx(classes.cartItemsLength, classes.orderSummaryTitle)}>
                ({cartItems.length}) {t('Product in cart')}
            </Typography>
            <List className={classes.orderSummary}>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Price")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {price} {t('SAR')}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Shipping Cost")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {shippingCost} {t('SAR')}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Subtotal")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {subtotal} {t('SAR')}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Tax")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {tax} {t('SAR')}
                    </Typography>
                </ListItem>
                <ListItem className={classes.orderSummaryChild}>
                    <Typography variant="body3" className={classes.orderSummaryTitle}>{t("Total Price")}</Typography>
                    <Typography variant="body1" className={classes.orderSummaryNum}>
                        {totalPrice} {t('SAR')}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
}

export default OrderSummary;
