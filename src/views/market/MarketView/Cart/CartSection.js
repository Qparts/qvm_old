import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import { Icon } from '@iconify/react';
import CartItem from './CartItem';
import OrderSummary from '../Shipping/OrderSummary';
import MarketActions from '../MarketUi/MarketActions';
import { PATH_APP } from 'src/routes/paths';
import MainCard from "../../../../components/Ui/MainCard";
import EmptyContent from "../../../../components/Ui/EmptyContent";

// ----------------------------------------------------------------------

function CartSection() {
    const { t } = useTranslation();
    const history = useHistory();
    const theme = useTheme();
    const { cartItems } = useSelector((state) => state.market);

    const continueShopping = (
        <>
            {<Icon icon={roundAddShoppingCart}
                style={{ fontSize: '20px', margin: theme.direction === 'rtl' ? theme.spacing(0, 0, 0, 1) : theme.spacing(0, 1, 0, 0)}} />}
            {t("Continue Shopping")}
        </>
    )

    return (
        cartItems.length === 0 ?
            <EmptyContent
                title={t("Cart is empty")}
                btnTitle={continueShopping}
                description={t("Look like you have no items in your shopping cart")}
                img="/static/illustrations/illustration_empty_cart.svg"
                url={() => history.push(PATH_APP.general.market)}
            />
            :
            <Grid container spacing={2}>
                <Grid item md={8} >
                    <CartItem />
                </Grid>

                <Grid item md={4} >
                    <MainCard title={t("Order Summary")}>
                        <OrderSummary />
                        <MarketActions
                            title={t("Back to shopping")}
                            clickAction={() => { history.push(PATH_APP.general.market) }}
                            clickCompletePur={() => { history.push(`/app/market/cart-shipping`) }} />
                    </MainCard>
                </Grid>
            </Grid>
    );
}

export default CartSection;
