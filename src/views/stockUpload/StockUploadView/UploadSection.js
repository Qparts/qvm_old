import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import AddStockForm from './AddStockForm';
import partSearchService from 'src/services/partSearchService';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

function UploadSection(props) {
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    const childRef = React.useRef()
    const [file, setFile] = useState();

    const stockSchema = Yup.object().shape({
        branch: Yup.string().required(t("Branch is required")),
        stockFile: Yup
            .mixed()
            .required(t("The file is required")),
    });


    const formik = useFormik({
        initialValues: {
            branch: '',
            stockFile: ''
        },
        validationSchema: stockSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("stockObject", JSON.stringify({
                    branchId: values.branch, extension: "xlsx",
                    mimeType: values.stockFile.type
                }));
                formData.append("file", values.stockFile);
                await partSearchService.qvmStockUpload(formData);
                enqueueSnackbar(t('Stock file has been uploaded'), { variant: 'success' });
                document.getElementById("stockFile").value = "";
                resetForm();
            } catch (error) {
                console.log("error", error);
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
                enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
            }
        }
    });

    return (
        <AddStockForm
            formik={formik}
            innerRef={childRef}
            setFile={setFile}
            file={file}
            checked={props.checked}
            handleChange={props.handleChange} />
    );
}

export default UploadSection;
