import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StockFileBtn from '../../../../components/Ui/StockFileBtn';
import TextField from '../../../../components/Ui/TextField';
import CustomButton from '../../../../components/Ui/Button';

// ----------------------------------------------------------------------

AddOfferForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddOfferForm({ formik }) {
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
    const { t } = useTranslation();
    const [offerDateError, setOfferDateError] = useState(null);
    const [fileError, setFileError] = useState(null);

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField
                    type='input'
                    name='offerName'
                    label={t('add offer name')}
                    getField={getFieldProps('offerName')}
                    touched={touched.offerName}
                    errors={errors.offerName} />

                <StockFileBtn
                    upload
                    onChange={(event) => {
                        if (event.currentTarget.files[0].name.split(".")[1] != 'xlsx' && event.currentTarget.files[0].name.split(".")[1] != 'xls') {
                            setFileError(t("Stock file must be Excel File"))
                            setFieldValue("offerFile", "");
                            return;
                        }
                        setFileError(null)
                        setFieldValue("offerFile", event.currentTarget.files[0]);
                    }}
                    title={t("upload stock file")}
                    file='offerFile'
                    label={t("upload stock file")}
                    value={values.offerFile}
                    touched={touched.offerFile}
                    errors={errors.offerFile}
                    fileError={fileError} />

                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type='date'
                            id='offerStartDate'
                            name='offerStartDate'
                            label={t("Offer Start Date")}
                            value={values.offerStartDate}
                            onChange={(newValue) => {
                                setFieldValue("offerStartDate", newValue);
                                if (Date.parse(values.offerEndDate) < Date.parse(newValue)) {
                                    setOfferDateError(t("The end date of the offer must be greater than the date of the start of the offer"));
                                    return;
                                }
                                else
                                    setOfferDateError(null)
                            }}
                            touched={touched.offerStartDate}
                            errors={errors.offerStartDate}
                            dateError={offerDateError} />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type='date'
                            id='offerEndDate'
                            name='offerEndDate'
                            label={t("Offer End Date")}
                            value={values.offerEndDate}
                            onChange={(newValue) => {
                                setFieldValue("offerEndDate", newValue);
                                if (Date.parse(newValue) < Date.parse(values.offerStartDate)) {
                                    setOfferDateError(t("The end date of the offer must be greater than the date of the start of the offer"));
                                    return;
                                }
                                else
                                    setOfferDateError(null)
                            }}
                            touched={touched.offerEndDate}
                            errors={errors.offerEndDate}
                            dateError={offerDateError} />
                    </Grid>
                </Grid>

                <TextField
                    type='input'
                    name='notes'
                    label={t('Notes')}
                    spaceToTop='spaceToTop'
                    getField={getFieldProps('notes')}
                    touched={touched.notes}
                    errors={errors.notes} />

                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton
                        type="submit"
                        disabled={Date.parse(values.offerEndDate) < Date.parse(values.offerStartDate)}
                    >
                        {t("add offer")}
                    </CustomButton>
                </Box>
            </Form>
        </FormikProvider >
    );
}

export default AddOfferForm;
