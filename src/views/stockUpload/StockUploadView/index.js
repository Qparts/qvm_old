import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import UploadSection from './UploadSection';

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

function StockUploadView(props) {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.stockUpload);
    const { t } = useTranslation();

    return (
        <Page
            title={t("stockUploadTab.title")}
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
                <UploadSection
                    checked={props.checked}
                    handleChange={props.handleChange} />
            </LoadingOverlay>
        </Page>
    );
}

export default StockUploadView;
