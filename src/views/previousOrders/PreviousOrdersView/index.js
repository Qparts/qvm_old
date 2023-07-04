import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import { getPreviousOrders } from 'src/redux/slices/previousOrders';
import constants from 'src/utils/constants';
import PreviousOrdersSection from './PreviousOrdersSection';

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
    },
    overlayFullPage: {
        '& ._loading_overlay_overlay': { position: 'fixed', zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function PreviousOrderView(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.previousOrders);

    useEffect(() => {
        dispatch(getPreviousOrders(0, 1, 5))
    }, [])

    return (
        <Page
            title={t("My Orders")}
            className={classes.root}>

            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                className={classes.overlayFullPage}
                spinner={
                    <LoadingScreen />
                }>
                <Box >
                    <PreviousOrdersSection />
                </Box>
            </LoadingOverlay>
        </Page>
    );
}

export default PreviousOrderView;
