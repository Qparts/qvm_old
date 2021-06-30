import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddOfferForm from './AddOfferForm';
import partSearchService from 'src/services/partSearchService';

// ----------------------------------------------------------------------

function AddOffer() {
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    const { loginObject } = useSelector(
        (state) => state.authJwt
    );

    const userSchema = Yup.object().shape({
        offerName: Yup.string().required(t("Offer name is required")),
        offerStartDate: Yup.date().required(t("Offer start date is required")).nullable(),
        offerEndDate: Yup.string().required(t("Offer end date is required")).nullable(),
        offerFile: Yup
            .mixed()
            .required(t("The file is required")),
    });

    const formik = useFormik({
        initialValues: {
            offerName: '',
            offerStartDate: null,
            offerEndDate: null,
            offerFile: '',
            notes: '',
        },
        validationSchema: userSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm, setFieldValue }) => {
            try {
                const formData = new FormData();
                console.log("values", values);
                const offerObject = {
                    branchId: loginObject.company.defaultBranchId,
                    extension: "xlsx",
                    mimeType: values.offerFile.type,
                    offerName: values.offerName,
                    notes: values.notes,
                    startDate: values.offerStartDate.getTime(),
                    endDate: values.offerEndDate.getTime()
                };
                formData.append("offerObject", JSON.stringify(offerObject));
                formData.append("file", values.offerFile);
                await partSearchService.qvmSpecialOfferUpload(formData);
                enqueueSnackbar(t('Offer file has been uploaded'), { variant: 'success' });
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

    return <AddOfferForm formik={formik} />
}

export default AddOffer;
