import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Hidden } from '@material-ui/core';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';
import TopBar from 'src/layouts/HomeLayout/TopBar';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Switch } from '@material-ui/core';
import PlanCard from './PlanCard';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(10)
    },
    header: {
        top: 0,
        left: 0,
        lineHeight: 0,
        width: '100%',
        position: 'absolute',
        padding: theme.spacing(3, 3, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(5, 5, 0)
        }
    }
}));


// ----------------------------------------------------------------------

function PricesView(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { planFeatures, isLoading, availablePlans } = useSelector(
        (state) => state.authJwt
    );
    const [premiumPlan, setPremiumPlan] = useState();

    useEffect(() => {
        if (availablePlans[1])
            setPremiumPlan(availablePlans[1]?.planDurations[2]);
    }, [isLoading])
    return (
        <Page title="Prices | Minimal UI" className={classes.root}>

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
                    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                        <TopBar />

                        <Typography variant="h3" align="center" gutterBottom>
                            {t("Try our free package now, and upgrade to the premium plan to grow your business")}

                        </Typography>
                        <Typography align="center" sx={{ color: 'text.secondary' }}>
                            {t("You can access huge numbers of auto spare parts and deal with great number of vendors")}
                        </Typography>



                        <Box sx={{ my: 5 }} />

                        <ToggleButtonGroup value={premiumPlan} exclusive sx={{ mb: 2, display: 'block' }}>
                            {availablePlans[1]?.planDurations.map((duration, index) => (
                                <ToggleButton
                                    key={index}
                                    value={duration}
                                    onClick={() => setPremiumPlan(duration)}
                                >
                                    {t("Pay")}  {duration.calculationDays == 30 ?
                                        t('Month') :
                                        duration.calculationDays == 180 ?
                                            6 + ' ' + t('Months') + '-' + t("Save") +
                                            Math.round(((duration.discountPercentage * (availablePlans[1].price / 360))) * duration.calculationDays)
                                            + ' ' + t('SAR') :
                                            t('Yearly') + '-' + t("Save") +
                                            Math.round(((duration.discountPercentage * (availablePlans[1].price / 360))) * duration.calculationDays)
                                            + ' ' + t('SAR')
                                    }
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>


                    </Box>


                    <Grid container spacing={3}>
                        {planFeatures.map((plan, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <PlanCard plan={plan} duration={premiumPlan} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

            </LoadingOverlay>
        </Page>
    );
}

export default PricesView;
