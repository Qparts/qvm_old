import React from 'react';
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';
import { useSnackbar } from 'notistack';
import Button from 'src/components/Ui/Button';

// ----------------------------------------------------------------------

function UpgradeBtn() {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const { currentPlan } = useSelector((state) => state.authJwt);

    return (
        (currentPlan) &&
        (currentPlan.status != 'A') &&
        <Button
            btnWidth="btnWidth"
            onClick={() => helper.gotoPremium(
                history,
                enqueueSnackbar,
                t('There is a pending subscription'),
                PATH_APP.general.upgradeSubscription,
                t('There was an error please try again later')
            )}
        >
            {t("Upgrade to Premium")}
        </Button>
    );
}

export default UpgradeBtn;
