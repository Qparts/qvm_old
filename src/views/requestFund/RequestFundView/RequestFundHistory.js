import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MainCard from 'src/components/Ui/MainCard';
import Datatable from 'src/components/table/DataTable';

// ----------------------------------------------------------------------

function RequestFundHistory(props) {
    const { t } = useTranslation();
    const { fundRequests } = useSelector((state) => state.requestFund);

    const getStatusLabel = (item) => {
        let value = t("Approved")
        if (item.status == "N")
            value = t("Under Review");
        else if (item.status == "R")
            value = t("Rejected");
        return value;
    }

    return (
        <MainCard title={t("Requests History")}>
            <Datatable
                header={[
                    {
                        name: t("Id"),
                        attr: 'id',
                    },
                    {
                        name: t("Date"),
                        attr: 'created',
                        type: 'date'
                    },
                    {
                        name: t("Amount"),
                        attr: 'amount'
                    },
                    {
                        name: t("Status"),
                        attr: 'status',
                        getValue: getStatusLabel
                    }
                ]}
                datatable={fundRequests}
                page={0}
                isLazy={false}
                hasPagination={false}
                dataTableQuotationsReportDetail='dataTableQuotationsReportDetail'
            />
        </MainCard>
    )
}

export default RequestFundHistory;
