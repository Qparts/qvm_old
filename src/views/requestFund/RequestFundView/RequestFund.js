import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RequestFunForm from './RequestFundForm';
import { Grid } from '@material-ui/core';
import MainCard from 'src/components/Ui/MainCard';

// ----------------------------------------------------------------------

function RequestFund() {
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    const { loginObject } = useSelector(
        (state) => state.authJwt
    );

    const userSchema = Yup.object().shape({
        companyName: Yup.string().required(t("Company Name Is Required")),
        name: Yup.string().required(t("Name Is Required")),
        crFile: Yup
            .mixed()
            .required(t("CR file is required")),
        idFile: Yup
            .mixed()
            .required(t("Id file is required")),
        banckStatementFile: Yup
            .mixed()
            .required(t("Banck Statement file is required")),
        fundAmount: Yup.string().required(t("Fund amount is required")),
        mobile: Yup.string().trim().matches('^[0-9]*$', t('Phone number is not valid'))
            .required(t("Mobile Is Required")),
        email: Yup.string()
            .email(t("Email Is Invalid"))
            .required(t("Email Is Required")),
    });

    const formik = useFormik({
        initialValues: {
            companyName: loginObject.company.name,
            name: loginObject.subscriber.name,
            crFile: '',
            idFile: '',
            banckStatementFile: '',
            fundAmount: '',
            mobile: loginObject.subscriber.mobile,
            email: loginObject.subscriber.email
        },
        validationSchema: userSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm, setFieldValue }) => {
            try {
                console.log("values", values);
                document.getElementById("offerFile").value = "";
                resetForm();
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
                enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
            }
        }
    });

    return (
        <Grid container spacing={3}>
            <Grid item sm />
            <Grid item md={6} sm={8} xs={12}>
                <MainCard title={t("Fund")}>
                    <RequestFunForm formik={formik} />
                </MainCard>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

export default RequestFund;
