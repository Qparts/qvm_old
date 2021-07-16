import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import MarketItemsSection from './MarketItemsSection';
import CartSection from './Cart/CartSection';
import ShippingSection from './Shipping/ShippingSection';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    },
    wrapper: {
        width: "100%",
        height: "100%",
    },
}));

// ----------------------------------------------------------------------

function MarketView(props) {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.quotationsReport);
    const { cartItems } = useSelector((state) => state.market);
    const { t } = useTranslation();
    const history = useHistory();
    const marketService = props.match.params.service;

    useEffect(() => {
        if (cartItems.length == 0 && marketService != null) {
            history.push(PATH_APP.general.market);
        }
    }, [])

    return (
        <Page
            title={marketService ? t(marketService) : t("Market")}
            className={classes.root}
        >
            <LoadingOverlay
                active={isLoading}
                className={classes.wrapper}
                spinner={<LoadingScreen />}
            >
                <Box sx={{ pb: 5 }}>
                    
                    {marketService != 'cart-shipping' &&
                        <div>
                            <Typography variant="h4">{marketService ? t(marketService) : t("Market")}</Typography>
                            <hr />
                            <Box sx={{ mb: 2 }} />
                        </div>
                    }

                    {marketService == null ? <MarketItemsSection />
                        : marketService == 'cart' ? <CartSection /> :
                            marketService == 'cart-shipping' ? <ShippingSection /> :
                                null
                    }

                </Box>
            </LoadingOverlay>

        </Page>
    );
}

export default MarketView;
