import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
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



// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function SubscriptionView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();

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

                    <Typography align="justify" style={{ margin: 20 }}>
                        {t("Subscription History")}
                    </Typography>
                    <CardContent className={classes.cardContent}>


                    </CardContent >

                </Card>
            </div>
        </div>


    );
}

export default SubscriptionView;
