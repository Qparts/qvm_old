import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import { cleanup } from 'src/redux/slices/quotationsReport';
import QuotationSearchSection from './searchSection/QuotationSearchSection';

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
        '& ._loading_overlay_overlay': { zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function QuotationsReportView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.quotationsReport);
    const { t } = useTranslation();

    useEffect(() => {
        return () => { dispatch(cleanup()) }
    }, []);

    return (
        <Page
            title={t("reports")}
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
                <QuotationSearchSection />

            </LoadingOverlay>
        </Page>
    );
}

export default QuotationsReportView;
