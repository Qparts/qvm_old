import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from 'src/components/Page';
import SearchBar from "../../../components/Ui/SearchBar";

function GeneralSearchSection() {
    const { t } = useTranslation();
    return (
        <Page title={t("home")}>
            <SearchBar searchHead='searchHead' />
        </Page>
    )
};

export default GeneralSearchSection
