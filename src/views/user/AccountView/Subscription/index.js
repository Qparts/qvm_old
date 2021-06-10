import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import UpgradeSection from './UpgradeSection';
import {
    Box, Link, Hidden, Container,
    Typography, Alert,
    Divider,
    Grid,
    CardHeader
} from '@material-ui/core';
import PlanFeaturesSection from './PlanFeaturesSection';
import helper from 'src/utils/helper';



// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function SubscriptionView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { loginObject } = useSelector((state) => state.authJwt);

    return (


        <div className="row">

            <div className="col-md-6">
                <Card >

                    <CardContent className={classes.cardContent}>
                        <UpgradeSection />
                        <Divider />
                        <PlanFeaturesSection />
                    </CardContent >

                </Card>
            </div>



            <div className="col-md-6">
                <Card >

                    <Typography align="justify" style={{ margin: 20 }} variant="h5">
                        {t("Subscription History")}
                    </Typography>
                    <CardContent className={classes.cardContent}>
                        {
                            loginObject.company.subscriptions.map((item, index) => {
                                return (
                                    <div>
                                        <Typography variant="subtitle1" align="justify">
                                            {item.status == 'B' ?
                                                t("Basic Plan") : item.status == 'A' ? t("Premium Plan") + "(" + t("Active") + ")" : t("Premium Plan")}
                                        </Typography>
                                        <Typography variant="subtitle1" align="justify">
                                            {helper.toDate(item.startDate)} {item.endDate ? ' - ' + helper.toDate(item.endDate) : ""}
                                        </Typography>
                                        <Box sx={{ mb: 3 }} />
                                        <Divider />
                                        <Box sx={{ mb: 3 }} />

                                    </div>
                                )

                            })
                        }


                    </CardContent >

                </Card>
            </div>
        </div>


    );
}

export default SubscriptionView;
