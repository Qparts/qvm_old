import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Button from "src/components/button/CustomButton";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
    Box, Link, Hidden, Container,
    Typography, Alert
} from '@material-ui/core';
import PremiumPlanSubscription from './PremiumPlanSubscription';
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

function PremiumPlanDurationSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { premiumPlan } = useSelector(
        (state) => state.authJwt
    );

    const { themeDirection } = useSelector((state) => state.settings);

    const [planDuration, setPlanDuration] = useState(null);




    return (

        <>
            <div className="row">
                {premiumPlan.planDurations.map((item, index) => {
                    return (
                        <div className="col-md-4" key={index}>
                            <Card >

                                <CardContent className={classes.cardContent}>
                                    <Typography variant="subtitle2" align="center">{t("Pay")}  {item.calculationDays == 30 ? t('Month') :
                                        item.calculationDays == 180 ? 6 + ' ' + t('Months') : t('Year')}
                                    </Typography>
                                    <Box sx={{ mb: 3 }} />

                                    <Typography variant="subtitle2" align="center">{t("Save")}
                                        {Math.round(((item.discountPercentage * (premiumPlan.price / 360))) * item.calculationDays)} {t('SAR')}
                                    </Typography>
                                    <Box sx={{ mb: 3 }} />

                                    <Typography variant="subtitle2" align="center">
                                        {Math.round(((premiumPlan.price / 360) - (item.discountPercentage * (premiumPlan.price / 360))) * item.calculationDays)}
                                        {"\n"} {t('SAR')}/{item.calculationDays == 30 ? 1 + ' ' + t('Month') : item.calculationDays == 180 ? 6 + ' ' + t('Months') : 1 + ' ' + t('Year')}
                                    </Typography>

                                    <Box sx={{ mb: 3 }} />

                                    <div className="row d-flex justify-content-center">
                                        <Button
                                            className="round"
                                            color="primary"
                                            className="mx-2"
                                            round
                                            simple
                                            onClick={() => setPlanDuration(item)}
                                        >
                                            {t("Subscrip")}
                                        </Button>

                                    </div>


                                </CardContent >

                            </Card>
                        </div>
                    )
                })}

            </div>



            <Dialog
                onClose={() => setPlanDuration(null)}
                aria-labelledby="customized-dialog-title"
                open={planDuration != null}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {planDuration ? t('Premium Plan') + (
                            planDuration.calculationDays == 30 ? ' ' + t('Month') :
                                planDuration.calculationDays == 180 ? ' ' + 6 + ' ' + t('Months') :
                                    ' ' + ' ' + t('Year')
                        )
                            : ''}
                    </Typography>
                </DialogTitle>
                <DialogContent >

                    <PremiumPlanSubscription
                        planDuration={planDuration}
                        setPlanDuration={setPlanDuration}
                    />
                </DialogContent>
            </Dialog>


        </>

    );
}

export default PremiumPlanDurationSection;
