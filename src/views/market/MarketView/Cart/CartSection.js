import React, { } from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CartItem from './CartItem';
import { useHistory } from 'react-router-dom';
import CustomButton from 'src/components/Ui/Button';
import { PATH_APP } from 'src/routes/paths';
import OrderSummary from '../Shipping/OrderSummary';
import QVMCard from 'src/components/Ui/QvmCard';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
}));

// ----------------------------------------------------------------------

function CartSection(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { cartItems } = useSelector((state) => state.market);
    const history = useHistory();

    return (
        <Grid container spacing={2}>
            <Grid item md={8} >
                {
                    cartItems.map((item, index) => {
                        return <CartItem product={item.product} quantity={item.quantity} key={index} />
                    })
                }

            </Grid>

            <Grid item md={4} >
                <QVMCard title={t("Order Summary")} >
                    <OrderSummary />
                    <Box sx={{ marginTop: '20px' }}>
                        <CustomButton
                            onClick={() => { history.push(`/app/market/cart-shipping`); }}
                        >{t("Complete the purchase")}
                        </CustomButton>
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                        <CustomButton
                            onClick={() => {
                                history.push(PATH_APP.general.market);
                            }}
                        >{t("Back to shopping")}
                        </CustomButton>
                    </Box>
                </QVMCard>
            </Grid>

        </Grid>
    );
}

export default CartSection;
