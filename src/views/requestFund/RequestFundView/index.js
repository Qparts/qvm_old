import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import Page from 'src/components/Page';
import RequestFund from './RequestFund';

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
    overlayFullPage: {
        '& ._loading_overlay_overlay': { position: 'fixed', zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function RequestFundView() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isLoading } = useSelector((state) => state.requestFund);

    return (
        <Page
            title={t("Request Fund")}
            className={classes.root}
        >
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
                }
            >
                <RequestFund overlay={classes.overlayFullPage} />
            </LoadingOverlay>
        </Page>
    );
}

export default RequestFundView;
