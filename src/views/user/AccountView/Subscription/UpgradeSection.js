import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router";
import { PATH_APP } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import {
    Typography,
    Box
} from '@material-ui/core';
import helper from 'src/utils/helper';
import Button from '../../../../components/Ui/Button';

// ----------------------------------------------------------------------

function UpgradeSection() {
    const theme = useTheme();
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { currentPlan } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);
    const { pendingSubscriptions } = useSelector((state) => state.branches);

    return (
        <Box>
            <Box sx={{ marginBottom: currentPlan.status !== 'A' ? '20px' : 0 }}>
                <Typography variant="body4" sx={{ color: theme.palette.secondary.light }}>
                    {t("Current Plan")}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: theme.typography.fontWeightBold, color: theme.palette.secondary.main }}>
                    {themeDirection === 'ltr' ? currentPlan.name : currentPlan.nameAr}
                </Typography>
            </Box>

            {(currentPlan.status !== 'A') &&
                <Button
                    upgradeBtn="upgradeBtn"
                    onClick={() => helper.gotoPremium(
                        pendingSubscriptions,
                        history,
                        enqueueSnackbar,
                        t('There is a pending subscription'),
                        PATH_APP.general.upgradeSubscription,
                        dispatch
                    )}
                >
                    {t("Upgrade to Premium")}
                </Button>
            }
        </Box>
    );
}

export default UpgradeSection;
