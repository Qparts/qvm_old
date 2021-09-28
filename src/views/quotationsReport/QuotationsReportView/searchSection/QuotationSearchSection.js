import React, { useState } from 'react';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import QuotationSearchForm from './QuotationSearchForm';
import { PATH_APP } from 'src/routes/paths';
import Datatable from 'src/components/table/DataTable';
import { getQuotationReport, setSelectedQuotation } from 'src/redux/slices/quotationsReport';
import TableAction from 'src/components/Ui/TableAction';
import { Plus } from 'src/icons/icons';
import Label from "src/components/Ui/Label";
import CustomDialog from 'src/components/Ui/Dialog';
import SecContainer from 'src/components/Ui/SecContainer';
import EmptyContent from "src/components/Ui/EmptyContent";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    }
}));

// ----------------------------------------------------------------------

function QuotationSearchSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const isMountedRef = useIsMountedRef();
    const [subscription, setSubscription] = useState(false);
    const { data, selectedQuotation } = useSelector((state) => state.quotationsReport);
    const { themeDirection } = useSelector((state) => state.settings);
    const { currentPlan } = useSelector((state) => state.authJwt);

    const date = new Date();

    const stockSchema = Yup.object().shape({
        month: Yup.string().required(t("Month is required")),
        year: Yup
            .mixed()
            .required(t("Year is required")),
    });

    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='partSearch'
                title={t("Details")}
                onClick={() => showDetailsAction(item)}
                textIcon={<Plus width='14' height='14' fill='#CED5D8' />} />
        )
    }

    const showDetailsAction = (item) => {
        dispatch(setSelectedQuotation(JSON.parse(item)));
    }

    const formik = useFormik({
        initialValues: {
            month: date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1,
            year: date.getFullYear()
        },
        validationSchema: stockSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                if (currentPlan.status === 'A') {
                    // console.log("values", values);
                    dispatch(getQuotationReport(values.year, values.month));
                    setSubscription(false);
                }
                else {
                    setSubscription(true);
                }
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
            }
        }
    });

    // console.log(selectedQuotation)

    return (
        <Box sx={{ width: '100%' }}>

            <QuotationSearchForm formik={formik} />
            <Box mb={4} />
            {subscription ?
                <EmptyContent
                    btnTitle={t("Upgrade to Premium")}
                    title={t("You are not subscribed")}
                    description={t("In order to be able to know your sales and purchases reports throughout the year upgrade to the premium package")}
                    url={() => history.push(PATH_APP.general.upgradeSubscription)}
                />
                :
                data.length > 0 ?
                    <SecContainer header={t('reports')} bodyP="bodyP">
                        <Datatable
                            header={[
                                {
                                    name: t("Received From"),
                                    attr: themeDirection == 'rtl' ? 'company.nameAr' : 'company.name',
                                },
                                {
                                    name: t("Date"),
                                    attr: 'created',
                                    type: 'date'
                                },
                                {
                                    name: t("Number of items"),
                                    attr: 'items.length'
                                }
                            ]}
                            actions={[{ element: showDetailsElement }]}
                            datatable={data}
                            page={0}
                            isLazy={false}
                            hasPagination={true}
                            dataTableQuotationsReport="dataTableQuotationsReport"
                        />

                        <CustomDialog
                            open={selectedQuotation != null}
                            handleClose={() => dispatch(setSelectedQuotation(null))}
                            title={t("Quotation Items")}
                            dialogWidth='dialogWidth'>

                            <Datatable
                                header={[
                                    {
                                        name: t("Part Number"),
                                        attr: 'productNumber',
                                        badge: <Label specialOffer="specialOffer" label={t("Special offer")} />,
                                    },
                                    {
                                        name: t("Brand"),
                                        attr: 'brand',
                                    },
                                    {
                                        name: t("Quotation Price"),
                                        attr: 'retailPrice',
                                        type: 'number'
                                    }
                                ]}
                                datatable={selectedQuotation?.items}
                                page={0}
                                isLazy={false}
                                hasPagination={true}
                                rowsPerPage={5}
                                dataTablePad='dataTablePad'
                                dataTableQuotationsReportDetail='dataTableQuotationsReportDetail'
                            />
                        </CustomDialog>
                    </SecContainer>
                    : ""}
        </Box>
    );
}

export default QuotationSearchSection;
