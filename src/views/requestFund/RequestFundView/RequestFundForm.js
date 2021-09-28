import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StockFileBtn from 'src/components/Ui/StockFileBtn';
import TextField from 'src/components/Ui/TextField';
import CustomButton from 'src/components/Ui/Button';

// ----------------------------------------------------------------------

RequestFunForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function RequestFunForm({ formik }) {
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
    const { t } = useTranslation();
    // const [fileError, setFileError] = useState(null);

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField
                    type='input'
                    name='companyName'
                    label={t('Company Name')}
                    getField={getFieldProps('companyName')}
                    touched={touched.companyName}
                    errors={errors.companyName} />
                <Box sx={{ mb: 3 }} />

                <TextField
                    type='input'
                    name='name'
                    label={t('Name')}
                    getField={getFieldProps('name')}
                    touched={touched.name}
                    errors={errors.name} />
                <Box sx={{ mb: 3 }} />

                <StockFileBtn
                    upload
                    onChange={(event) => {
                        // if (event.currentTarget.files[0].name.split(".")[1] != 'xlsx') {
                        //     setFileError(t("Stock file must be Excel File"))
                        //     setFieldValue("offerFile", "");
                        //     return;
                        // }
                        // setFileError(null)
                        setFieldValue("crFile", event.currentTarget.files[0]);
                    }}
                    title={t("Upload CR file")}
                    file='crFile'
                    label={t("Upload CR file")}
                    value={values.crFile}
                    touched={touched.crFile}
                    errors={errors.crFile}
                // fileError={fileError} 
                />

                <Box sx={{ mb: 3 }} />


                <StockFileBtn
                    upload
                    onChange={(event) => {
                        setFieldValue("idFile", event.currentTarget.files[0]);
                    }}
                    title={t("Upload ID file")}
                    file='idFile'
                    label={t("Upload ID file")}
                    value={values.idFile}
                    touched={touched.idFile}
                    errors={errors.idFile}
                />

                <Box sx={{ mb: 3 }} />

                <StockFileBtn
                    upload
                    onChange={(event) => {
                        setFieldValue("banckStatementFile", event.currentTarget.files[0]);
                    }}
                    title={t("Upload the bank statement file")}
                    file='banckStatementFile'
                    label={t("Upload the bank statement file")}
                    value={values.banckStatementFile}
                    touched={touched.banckStatementFile}
                    errors={errors.banckStatementFile}
                />
                <Box sx={{ mb: 3 }} />

                <TextField
                    type='input'
                    name='fundAmount'
                    label={t('Fund Amount')}
                    getField={getFieldProps('fundAmount')}
                    touched={touched.fundAmount}
                    errors={errors.fundAmount} />

                <Box sx={{ mb: 3 }} />

                <TextField
                    type='input'
                    name='mobile'
                    label={t('Mobile')}
                    getField={getFieldProps('mobile')}
                    touched={touched.mobile}
                    errors={errors.mobile} />

                <Box sx={{ mb: 3 }} />


                <TextField
                    type='input'
                    name='email'
                    label={t('Email')}
                    getField={getFieldProps('email')}
                    touched={touched.email}
                    errors={errors.email} />

                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton type="submit">{t("Submit")}</CustomButton>
                </Box>
            </Form>
        </FormikProvider >
    );
}

export default RequestFunForm;
