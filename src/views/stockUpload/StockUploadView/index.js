import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Box,
    Container,
    Typography
} from '@material-ui/core';
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
    }
}));

// ----------------------------------------------------------------------

function StockUploadView() {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.stockUpload);
    const { t } = useTranslation();


    return (
        <Page
            title={t("stockUploadTab.title")}
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
                        <Typography variant="h4">{t("Stock Upload")}</Typography>
                        <hr />
                    </Box>

                    <UploadSection />


                </Container>
            </LoadingOverlay>

        </Page>
    );
}

export default StockUploadView;
