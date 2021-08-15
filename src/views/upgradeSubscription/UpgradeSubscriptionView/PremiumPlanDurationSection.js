import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid } from '@material-ui/core';
import PremiumPlanSubscription from './PremiumPlanSubscription';
import SecContainer from '../../../components/Ui/SecContainer';
import Card from '../../../components/Ui/Card';
import CustomDialog from '../../../components/Ui/Dialog';
import Button from '../../../components/Ui/Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    planPremiumLabel: {
        position: 'absolute',
        top: 0,
        background: 'linear-gradient(90deg, #167DAC 10%, #164B63 100%)',
        borderRadius: '0 0 30px 30px',
        color: theme.palette.grey[0],
        padding: '8px 20px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        '@media (max-width: 349px)': {
            left: '39%',
            transform: 'translate(-35%, 0)'
        }
    },
}));

// ----------------------------------------------------------------------

function PremiumPlanDurationSection() {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { premiumPlan } = useSelector((state) => state.authJwt);
    const [planDuration, setPlanDuration] = useState(null);

    return (
        <SecContainer
            header={t("Upgrade to Premium")}
            secContainerMt="secContainerMt">
            <Grid container spacing={2}>
                {premiumPlan.planDurations.map((item, index) => {
                    return (
                        <Grid item xs={12} md={4} key={index}>
                            <Card upgradeCard='upgradeCard'>
                                {item.calculationDays > 180 && (
                                    <Typography variant="subtitle1" className={classes.planPremiumLabel}> {t("Most popular")} </Typography>
                                )}
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            color: theme.palette.secondary.main,
                                            lineHeight: 1,
                                            marginBottom: '15px'
                                        }}>
                                        {t("Pay")}  {item.calculationDays == 30 ? t('Month') :
                                            item.calculationDays == 180 ? 6 + ' ' + t('Months') : t('Year')}
                                    </Typography>

                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: theme.typography.fontWeightRegular,
                                        }}>
                                        {t("Save")} {Math.round(((item.discountPercentage * (premiumPlan.price / 360))) * item.calculationDays)} {t('SAR')}
                                    </Typography>
                                </Box>

                                <Typography variant="h3"
                                    sx={{
                                        color: theme.palette.secondary.main,
                                        fontWeight: 400,
                                        lineHeight: 1
                                    }}>
                                    {Math.round(((premiumPlan.price / 360) - (item.discountPercentage * (premiumPlan.price / 360))) * item.calculationDays)}
                                </Typography>

                                <Typography variant="body3"
                                    sx={{
                                        color: '#8B8B8B',
                                        fontWeight: theme.typography.fontWeightMedium,
                                        marginBottom: '20px',
                                        display: 'block'
                                    }}>
                                    {t('SAR')} / {item.calculationDays == 30 ? 1 + ' ' + t('Month') : item.calculationDays == 180 ? 6 + ' ' + t('Months') : 1 + ' ' + t('Year')}
                                </Typography>

                                <Box>
                                    <Button
                                        btnWidth="btnWidth"
                                        flatBtn="flatBtn"
                                        homeBtnLight={item.calculationDays <= 180 ? 'homeBtnLight' : null}
                                        onClick={() => setPlanDuration(item)}
                                    >
                                        {t("Subscribe")}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <CustomDialog
                open={planDuration != null}
                handleClose={() => setPlanDuration(null)}
                dialogWidth="dialogWidth"
                title={planDuration ? t('Premium Plan') + (
                    planDuration.calculationDays == 30 ? ' ' + t('Month') :
                        planDuration.calculationDays == 180 ? ' ' + 6 + ' ' + t('Months') :
                            ' ' + ' ' + t('Year')) : ''}
            >
                <PremiumPlanSubscription
                    planDuration={planDuration}
                    setPlanDuration={setPlanDuration}
                />
            </CustomDialog>
        </SecContainer>
    );
}

export default PremiumPlanDurationSection;
