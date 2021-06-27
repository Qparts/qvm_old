import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Button from "src/components/button/CustomButton";
import { useHistory } from "react-router";
import { PATH_APP } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import {
    Box, Link, Hidden, Container,
    Typography, Alert
} from '@material-ui/core';
import paymentService from 'src/services/paymentService';
import { ElectricalServices } from '@material-ui/icons';
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

function UpgradeSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { currentPlan } = useSelector(
        (state) => state.authJwt
    );

    const { themeDirection } = useSelector((state) => state.settings);


    const gotoPremium = async () => {

        try {
            const { data: pendingSubscriptions } = await paymentService.getPendingSubscription();
            console.log("pendingSubscriptions", pendingSubscriptions);
            if (pendingSubscriptions != null && pendingSubscriptions != "")
                enqueueSnackbar(t('There is a pending subscription'), { variant: 'warning' });
            else
                history.push(PATH_APP.general.upgradeSubscription);

        } catch (error) {
            enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
        }
    }

    return (

        <>
            <div className="row">
                <div className="col-md-6">
                    <Typography align="justify" variant="h5">
                        {t("Current Plan")}
                    </Typography>
                    <Typography align="justify" variant="subtitle1" >
                        {themeDirection == 'ltr' ? currentPlan.name : currentPlan.nameAr}
                    </Typography>
                </div>


                {(currentPlan.status != 'A') &&
                    <div className="col-md-6">
                        <div className="d-flex justify-content-end">
                            <Button
                                className="round"
                                color="primary"
                                className="mx-2"
                                round
                                simple
                                onClick={() => {
                                    gotoPremium();
                                }}
                            >
                                {t("Upgrade to Premium")}
                            </Button>

                        </div>

                    </div>}

            </div>


        </>

    );
}

export default UpgradeSection;
