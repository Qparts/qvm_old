import React from 'react';
import { useTranslation } from 'react-i18next';
import UpgradeSection from './UpgradeSection';
import PlanFeaturesSection from './PlanFeaturesSection';
import SubscriptionHistory from './SubscriptionHistory';
import MainCard from "../../../../components/Ui/MainCard";

// ----------------------------------------------------------------------

function SubscriptionView() {
    const { t } = useTranslation();

    return (
        <MainCard title={t("Subscription")} cardPadd="cardPadd" cardMt='cardMt'>
            <UpgradeSection />
            <PlanFeaturesSection />
            <SubscriptionHistory />
        </MainCard>
    );
}

export default SubscriptionView;
