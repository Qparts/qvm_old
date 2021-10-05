import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form, FormikProvider } from 'formik';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StockFileBtn from 'src/components/Ui/StockFileBtn';
import TextField from 'src/components/Ui/TextField';
import CustomButton from 'src/components/Ui/Button';
import constants from 'src/utils/constants';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    userNotify: {
        color: '#7E8D99',
        marginTop: theme.spacing(1.25),
        display: 'block',
        textAlign: 'left'
    }
}));

// ----------------------------------------------------------------------

RequestFunForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function RequestFunForm({ formik }) {
    const classes = useStyles();
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
    const { t } = useTranslation();
    const [crFileError, setCrFileError] = useState(null);
    const [idFileError, setIdFileError] = useState(null);
    const [banckStatementFileError, setBanckStatementFileError] = useState(null);
    const maxFileSize = constants.UPLOADEDFILESIZE;

    const exceedFileSizeLimit = (file) => {
        return (file.size / (1024 * 1024)) > maxFileSize;
    }

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

                <Box sx={{ mb: 3 }} />

                <TextField
                    type='input'
                    name='fundAmount'
                    label={t('Funding Amount')}
                    getField={getFieldProps('fundAmount')}
                    touched={touched.fundAmount}
                    errors={errors.fundAmount} />

                <Typography variant="body2" className={classes.userNotify}>
                    {t("The final amount will be determined after reviewing the submitted data")}
                </Typography>
                <Box sx={{ mb: 3 }} />

                <StockFileBtn
                    upload
                    id="crFile"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        const extension = file.name.split(".")[1];
                        if (!['jpeg', 'png', 'jpg', 'pdf'].includes(extension.toLowerCase())) {
                            setCrFileError(t("CR file must be in these extensions jpeg, png, jpg, pdf"))
                            setFieldValue("crFile", "");
                        } else if (exceedFileSizeLimit(file)) {
                            setCrFileError(t('CR file must not be greater than', { value: maxFileSize }))
                            setFieldValue("crFile", "");
                        }
                        else {
                            setCrFileError(null)
                            setFieldValue("crFile", file);
                        }
                    }}
                    title={t("Upload CR file")}
                    file='crFile'
                    label={t("Upload CR file")}
                    value={values.crFile}
                    touched={touched.crFile}
                    errors={errors.crFile}
                    responsive='responsive'
                    fileError={crFileError}
                />

                <Box sx={{ mb: 3 }} />

                <StockFileBtn
                    upload
                    id="idFile"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        const extension = file.name.split(".")[1];
                        if (!['jpeg', 'png', 'jpg', 'pdf'].includes(extension.toLowerCase())) {
                            setIdFileError(t("ID file must be in these extensions jpeg, png, jpg, pdf"))
                            setFieldValue("idFile", "");
                        } else if (exceedFileSizeLimit(file)) {
                            setIdFileError(t('ID file must not be greater than', { value: maxFileSize }))
                            setFieldValue("idFile", "");
                        }
                        else {
                            setIdFileError(null);
                            setFieldValue("idFile", file);
                        }
                    }}
                    title={t("Upload ID file")}
                    file='idFile'
                    label={t("Upload ID file")}
                    value={values.idFile}
                    touched={touched.idFile}
                    errors={errors.idFile}
                    responsive='responsive'
                    fileError={idFileError}
                />

                <Box sx={{ mb: 3 }} />

                <StockFileBtn
                    upload
                    id="banckStatementFile"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        console.log("size", file.size)
                        const extension = file.name.split(".")[1];
                        if (!['jpeg', 'png', 'jpg', 'pdf'].includes(extension.toLowerCase())) {
                            setBanckStatementFileError(t("Bank statement file must be in these extensions jpeg, png, jpg, pdf"))
                            setFieldValue("banckStatementFile", "");
                        }
                        else if (exceedFileSizeLimit(file)) {
                            setBanckStatementFileError(t("Bank statement file must not be greater than", { value: maxFileSize }))
                            setFieldValue("banckStatementFile", "");
                        }
                        else {
                            setBanckStatementFileError(null);
                            setFieldValue("banckStatementFile", file);
                        }
                    }}
                    title={t("Upload the bank statement file")}
                    file='banckStatementFile'
                    label={t("Upload the bank statement file")}
                    value={values.banckStatementFile}
                    touched={touched.banckStatementFile}
                    errors={errors.banckStatementFile}
                    responsive='responsive'
                    fileError={banckStatementFileError}
                />

                <Typography variant="body2" className={classes.userNotify}>
                    {t("Operations statement must be for the last 12 months")}
                </Typography>

                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton type="submit">{t("Submit")}</CustomButton>
                </Box>
            </Form>
        </FormikProvider >
    );
}

export default RequestFunForm;
