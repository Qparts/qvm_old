import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Button from "src/components/button/CustomButton";
import { useHistory } from "react-router";
import { PATH_APP } from 'src/routes/paths';
import {
    Box, Link, Hidden, Container,
    Typography, Alert
} from '@material-ui/core';
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
    const { currentPlan } = useSelector(
        (state) => state.authJwt
    );

    const { themeDirection } = useSelector((state) => state.settings);


    return (

        <>
            <div className="row">
                <div className="col-md-6">
                    <Typography align="justify" >
                        {t("Current Plan")}
                    </Typography>
                    <Typography align="justify" >
                        {themeDirection == 'ltr' ? currentPlan.name : currentPlan.nameAr}
                    </Typography>
                </div>


                {currentPlan.name != 'Premium Plan' &&
                    <div className="col-md-6">
                        <div className="d-flex justify-content-end">
                            <Button
                                className="round"
                                color="primary"
                                className="mx-2"
                                round
                                simple
                                onClick={() => {
                                    history.push(PATH_APP.general.upgradeSubscription);
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
