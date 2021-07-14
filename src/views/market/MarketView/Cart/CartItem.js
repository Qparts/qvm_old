import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Box,
    Typography,
    Link
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { updateCartItems, updateBillingAddress } from 'src/redux/slices/market';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import QVMCard from 'src/components/Ui/Card';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
}));

// ----------------------------------------------------------------------

function CartItem({ product, quantity }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const { themeDirection } = useSelector((state) => state.settings);
    const { cartItems } = useSelector((state) => state.market);
    const isRlt = themeDirection == 'rtl';

    const removeFromCart = (product) => {
        let newItems = cartItems;
        newItems = newItems.filter(item => item.product.id != product.id);
        dispatch(updateCartItems(newItems));
        if (newItems.length == 0) {
            dispatch(updateBillingAddress(null));
            history.push(PATH_APP.general.market);
        }
    }

    return (
        <QVMCard>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <div style={{ marginTop: 50 }}>
                        <Box
                            component="img"
                            alt="logo"
                            src={product.img}
                            width={100}
                        />
                    </div>
                </Grid>

                <Grid item md={8}>

                    <Typography variant="body" sx={{ color: theme.palette.secondary.main }}> {isRlt ? product.brandAr : product.brand} ,
                        {isRlt ? product.nameAr : product.name} </Typography>
                    <Box>
                        <Box >
                            <Box >
                                <Typography variant="body"> {product.partNumber} </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1"> {product.price}  {t("SAR")}</Typography>
                            </Box>
                        </Box>
                        <Box >
                            <Typography variant="body" sx={{ color: theme.palette.secondary.darker }}>
                                {t('Quantity')} {quantity} {' / '} {t('Total Price')} {quantity * product.price}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                            <Link
                                underline="none"
                                variant="subtitle2"
                                component={RouterLink}
                                onClick={() => removeFromCart(product)}
                            >
                                {t("Delete")}
                            </Link>
                        </Typography>
                    </Box>

                </Grid>
            </Grid>
        </QVMCard>
    );
}

export default CartItem;
