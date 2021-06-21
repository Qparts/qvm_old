import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'

import Box from '@material-ui/core/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import QuotationSearchForm from './QuotationSearchForm';
import Datatable from 'src/components/table/DataTable';

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

    const date = new Date();

    const stockSchema = Yup.object().shape({
        month: Yup.string().required(t("Month is required")),
        year: Yup
            .mixed()
            .required(t("Year is required")),
    });


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
                        attr: 'receivedFrom',
                    },
                    {
                        name: t("Date"),
                        attr: 'created'
                    },
                    {
                        name: t("Number of items"),
                        attr: 'numOfItems'
                    }
                ]}
                datatable={[]}
                page={0}
                isLazy={false}
                hasPagination={false}

            />

        </Box>



    );
}

export default QuotationSearchSection;
