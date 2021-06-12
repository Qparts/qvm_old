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
import PremiumPlanDurationSection from './PremiumPlanDurationSection';

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

function UpgradeSubscriptionView() {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.stockUpload);
    const { t } = useTranslation();
    const { planFeatures, currentPlan } = useSelector(
        (state) => state.authJwt
    );

    return (
        <Page
            title={t("Upgrade to Premium")}
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
                        <Typography variant="h4">{t("Upgrade to Premium")}</Typography>
                        <hr />
                    </Box>

                    <PremiumPlanDurationSection />
                </Container>
            </LoadingOverlay>

        </Page>
    );
}

export default UpgradeSubscriptionView;
