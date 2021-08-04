import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import MarketItemsSection from './MarketItemsSection';
import CartSection from './Cart/CartSection';
import ShippingSection from './Shipping/ShippingSection';

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
    const marketService = props.match.params.service;

    return (
        <Page
            className={classes.root}
        >
            <LoadingOverlay
                active={isLoading}
                className={classes.wrapper}
                spinner={<LoadingScreen />}
            >

                {marketService == null ? <MarketItemsSection marketService={marketService} />
                    : marketService == 'cart' ? <CartSection /> :
                        marketService == 'cart-shipping' ? <ShippingSection /> :
                            null
                }
            </LoadingOverlay>
        </Page >
    );
}

export default MarketView;
