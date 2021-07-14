import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    ListItem,
    List
} from '@material-ui/core';
import helper from 'src/utils/helper';
import Accordion from '../../../../components/Ui/Accordion';
import ProgressBar from '../../../../components/Ui/ProgressBar'
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    currentPlanTime: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0 5px',
        margin: '10px 0 15px',
        borderTop: '1px solid #F6F8FC',
        borderBottom: '1px solid #F6F8FC',
    },
    planFeaturesChild: {
        display: 'block',
        padding: '0 0 10px 0',
        borderBottom: '1px solid #ECF1F5',
        marginBottom: '10px',
        '&:first-of-type': {
            paddingTop: '2px'
        },
        '&:last-of-type': {
            padding: 0,
            border: 0,
            marginBottom: 0
        }
    },
    planFeaturesOptionChild: {
        color: '#7E8D99',
    }
}));

// ----------------------------------------------------------------------

function PlanFeaturesSection() {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { planFeatures, currentPlan, loginObject } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);

    return (
        <>
            {currentPlan.name == 'Premium Plan' &&
                <Box sx={{ marginBottom: theme.spacing(2) }}>
                    <Box className={classes.currentPlanTime}>
                        <Box>
                            <Typography variant="body4" sx={{ color: theme.palette.secondary.light }}>
                                {t("Start in")}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.secondary.darker }}>
                                {helper.toDate(loginObject.company.subscriptions[0].startDate)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body4" sx={{ color: theme.palette.secondary.light }}>
                                {t("Expires in")}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.secondary.darker }}>
                                {helper.toDate(loginObject.company.subscriptions[0].endDate)}
                            </Typography>
                        </Box>
                    </Box>
                    <ProgressBar
                        title={t('The package has passed')}
                        timeLeft={helper.calculateTimeLeft(loginObject.company.subscriptions[0].startDate, loginObject.company.subscriptions[0].endDate) + '%'} />
                </Box>
            }

            <Accordion
                head={t("Features")}
                accordionStyle="accordionStyle">
                <List>
                    {planFeatures.find(e => e.name == currentPlan.name).features.map((feature, index) => {
                        return (
                            <ListItem key={index} className={classes.planFeaturesChild}>
                                <Typography variant="body2" sx={{ color: theme.palette.secondary.main }}>
                                    {themeDirection == 'ltr' ? feature.name : feature.nameAr}
                                </Typography>
                                <Typography variant="body4" className={classes.planFeaturesOptionChild}>
                                    {themeDirection == 'ltr' ? feature.value : feature.valueAr}
                                </Typography>
                            </ListItem>
                        )
                    })}
                </List>
            </Accordion>
        </>
    );
}

export default PlanFeaturesSection;
