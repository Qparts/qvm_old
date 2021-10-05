import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import PremiumPlanDurationSection from './PremiumPlanDurationSection';
import { useLocation, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import paymentService from 'src/services/paymentService';
import helper from 'src/utils/helper';
import { updateCurrentPlan, updateLoginObject } from 'src/redux/slices/authJwt';

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
            updatePaymentOrder();
        }
    }, [])

    const updatePaymentOrder = async () => {
        try {
            history.push(PATH_APP.management.user.account);
            const { data: company } = await paymentService.updatePaymentOrder({ chargeId: tapId });
            let newLoginObject = Object.assign({}, loginObject);
            newLoginObject.company = company;
            dispatch(updateLoginObject({ 'loginObject': newLoginObject }));
            dispatch(updateCurrentPlan());
            helper.enqueueSnackbarMessage(enqueueSnackbar, t("transaction successful"), 'success', closeSnackbar)
        } catch (error) {
            helper.enqueueSnackbarMessage(enqueueSnackbar, t("Transaction Declined"), 'error', closeSnackbar)
        }
    }

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
                <PremiumPlanDurationSection />
            </LoadingOverlay>
        </Page>
    );
}

export default UpgradeSubscriptionView;
