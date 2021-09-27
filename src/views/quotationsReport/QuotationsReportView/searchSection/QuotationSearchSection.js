import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'

import Box from '@material-ui/core/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import QuotationSearchForm from './QuotationSearchForm';
import Datatable from 'src/components/table/DataTable';
import { getQuotationReport, setSelectedQuotation } from 'src/redux/slices/quotationsReport';
import TableAction from 'src/components/Ui/TableAction';
import { Plus } from 'src/icons/icons';
import CustomDialog from 'src/components/Ui/Dialog';

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
    const isMountedRef = useIsMountedRef();
    const { isLoading, data, selectedQuotation } = useSelector((state) => state.quotationsReport);
    const { themeDirection } = useSelector((state) => state.settings);

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

    const isSpecialOffer = (item) => {
        return item.specialOffer;
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
                console.log("values", values);
                dispatch(getQuotationReport(values.year, values.month))
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
            }
        }
    });


    return (

        <Box sx={{ width: '100%' }}>

            <QuotationSearchForm formik={formik} />

            <Box sx={{ mb: 6 }} />

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
                            icon: <div style={{ color: 'red', backgroundColor: "rgba(238, 64, 54, 0.1)" }}>{t("Special Offer")}</div>,
                            showIcon: isSpecialOffer,
                        },
                        {
                            name: t("Brand"),
                            attr: 'brand',
                        },
                        {
                            name: t("Quotation Price"),
                            trueAttr: 'specialOfferPrice',
                            falseAttr: 'retailPrice',
                            condition: isSpecialOffer,
                            type: 'number'
                        }
                    ]}
                    datatable={selectedQuotation?.items}
                    page={0}
                    isLazy={false}
                    hasPagination={true}
                    rowsPerPage={5}
                />
            </CustomDialog>

        </Box>
    );
}

export default QuotationSearchSection;
