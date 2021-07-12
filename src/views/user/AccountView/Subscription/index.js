import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import UpgradeSection from './UpgradeSection';
import PlanFeaturesSection from './PlanFeaturesSection';
import SubscriptionHistory from './SubscriptionHistory';
import MainCard from "../../../../components/Ui/MainCard";

// ----------------------------------------------------------------------

function SubscriptionView() {
    const { t } = useTranslation();

    return (
        <Box>
            <MainCard title={t("Subscription")} cardPadd="cardPadd">
                <UpgradeSection />
                <PlanFeaturesSection />
                <SubscriptionHistory />
            </MainCard>
        </Box>
    );
}

export default SubscriptionView;
