import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import PremiumPlanSubscription from './PremiumPlanSubscription';
import { useLocation, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    overlayFullPage: {
        '& ._loading_overlay_overlay': { zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function UpgradeSubscriptionView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.stockUpload);
    const { t } = useTranslation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const location = useLocation();
    const history = useHistory();
    const { currentPlan, loginObject } = useSelector((state) => state.authJwt);

    const tapId = new URLSearchParams(location.search).get("tap_id");

    useEffect(() => {
        if (currentPlan.status == 'A') {
            history.push(PATH_APP.management.user.account);
        }

        if (tapId) {
            helper.updatePaymentOrder(history, PATH_APP.management.user.account, tapId, loginObject, dispatch, enqueueSnackbar, closeSnackbar, t);
        }
    }, []);

    return (
        <Page
            title={t("Upgrade to Premium")}
            className={classes.root}
        >
            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                className={classes.overlayFullPage}
                spinner={
                    <LoadingScreen />

                }
            >
                <PremiumPlanSubscription />
            </LoadingOverlay>
        </Page>
    );
}

export default UpgradeSubscriptionView;
