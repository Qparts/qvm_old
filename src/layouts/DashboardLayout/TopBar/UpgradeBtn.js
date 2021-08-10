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
    const { currentPlan, loginObject } = useSelector((state) => state.authJwt);

    return (
        (loginObject) &&
        (currentPlan.status != 'A') &&
        <Button
            btnWidth="btnWidth"
            onClick={() => { helper.gotoPremium(history, enqueueSnackbar, t('There is a pending subscription'), PATH_APP.general.upgradeSubscription, t) }}
        >
            {t("Upgrade to Premium")}
        </Button>
    );
}

export default UpgradeBtn;
