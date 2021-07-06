import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Divider,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import AvailabilityPartsSection from './AvailabilityPartsSection';
import ProductInfoSection from './ProductInfoSection';
import { cleanup } from 'src/redux/slices/partSearch';


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
    }
}));

// ----------------------------------------------------------------------

function PartSearchView() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoading, productInfoResult = [] } = useSelector((state) => state.PartSearch);

    useEffect(() => {
        return () => {
            dispatch(cleanup())
        }
    }, []);

    return (
        <Page
            title={t("Search Parts")}
            className={classes.root}>

            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                spinner={
                    <LoadingScreen />

                }>
                <Box sx={{ pb: 2 }}>
                    <Typography variant="h4">{t("Search Parts")}</Typography>
                    <Divider />
                </Box>
                <AvailabilityPartsSection />
                {productInfoResult.length > 0 ?
                    <>
                        <Box sx={{ mb: 6 }} />
                        <ProductInfoSection />
                    </> : ""
                }
            </LoadingOverlay>

        </Page>
    );
}

export default PartSearchView;
