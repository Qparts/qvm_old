import React, { } from 'react';
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
    const { planFeatures, isLoading } = useSelector(
        (state) => state.authJwt
    );
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

                <Container>
                    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                        <TopBar />



                    </Box>
                </Container>


                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" gutterBottom>
                        {t("Try our free package now, and upgrade to the premium plan to grow your business")}
                   
                    </Typography>
                    <Typography align="center" sx={{ color: 'text.secondary' }}>
                        {t("You can access huge numbers of auto spare parts and deal with great number of vendors")}
                    </Typography>

                    <Box sx={{ my: 5 }} />


                    <Grid container spacing={3}>
                        {planFeatures.map((plan, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <PlanCard plan={plan} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </LoadingOverlay>
        </Page>
    );
}

export default PricesView;
