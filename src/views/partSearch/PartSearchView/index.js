import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Container,
    Divider,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import AvailabilityPartsSection from './AvailabilityPartsSection';
import PartSearchSection from './PartSearchSection';
import ProductInfoSection from './ProductInfoSection';
import LocationFilterSection from './LocationFilterSection';


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
    const { isLoading } = useSelector((state) => state.PartSearch);



    return (
        <Page
            title={t("searchTab.title")}
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
                spinner={
                    <LoadingScreen />

                }
            >
                <Container >

                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">{t("searchTab.title")}</Typography>
                        <Divider />
                    </Box>

                    <PartSearchSection />
                    <Box sx={{ mb: 6 }} />

                    <LocationFilterSection />
                    <Box sx={{ mb: 6 }} />

                    <AvailabilityPartsSection />

                    <Box sx={{ mb: 6 }} />

                    <ProductInfoSection />

                </Container>
            </LoadingOverlay>

        </Page>
    );
}

export default PartSearchView;
