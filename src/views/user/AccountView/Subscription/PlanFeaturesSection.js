import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import { Box } from '@material-ui/core';

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

function PlanFeaturesSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { planFeatures, currentPlan } = useSelector(
        (state) => state.authJwt
    );

    const { themeDirection } = useSelector((state) => state.settings);


    return (

        <>
            <Box sx={{ mt: 3 }} />
            <div className="row">
                {t("Features")}
            </div>
            <Box sx={{ mt: 3 }} />

            <div className="row">
                {planFeatures.find(e => e.name == currentPlan.name).features.map((feature, index) => {
                    return (
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    {themeDirection == 'ltr' ? feature.name : feature.nameAr}
                                </div>
                                <div className="col-md-6">
                                    {themeDirection == 'ltr' ? feature.value : feature.valueAr}
                                </div>
                            </div>

                        </div>
                    )
                })}

            </div>

        </>

    );
}

export default PlanFeaturesSection;
