import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import {
    Grid,
    Box
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StockFileBtn from '../../../../components/Ui/StockFileBtn';
import CustomInput from '../../../../components/Ui/Input';
import CustomButton from '../../../../components/Ui/Button';
import Label from '../../../../components/Ui/Label';

// ----------------------------------------------------------------------

AddOfferForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddOfferForm({ formik }) {
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
    const { t } = useTranslation();

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                <CustomInput
                    name='offerName'
                    type='text'
                    label={t('add offer name')}
                    getField={getFieldProps('offerName')}
                    touched={touched.offerName}
                    errors={errors.offerName} />

                <StockFileBtn
                    onChange={(event) => {
                        setFieldValue("offerFile", event.currentTarget.files[0]);
                    }}
                    touched={touched.offerFile}
                    errors={errors.offerFile} />

                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Label name={t("start in")} />
                        <CustomInput
                            id="offerStartDate"
                            name='offerStartDate'
                            type='date'
                            error={Boolean(touched.offerStartDate && errors.offerStartDate)}
                            helperText={touched.offerStartDate && errors.offerStartDate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label name={t("ends in")} />
                        <CustomInput
                            id="offerEndDate"
                            name='offerEndDate'
                            type='date'
                            error={Boolean(touched.offerEndDate && errors.offerEndDate)}
                            helperText={touched.offerEndDate && errors.offerEndDate}
                        />
                    </Grid>
                </Grid>
{/* 
                <CustomInput
                    name='discount'
                    type='text'
                    label={t('put discount value')}
                    spaceToTop='spaceToTop'
                    getField={getFieldProps('discount')}
                    touched={touched.discount}
                    errors={errors.discount} /> */}

                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton type="submit">{t("upload stock")}</CustomButton>
                </Box>

                {/* <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            required
                            name="offerName"
                            label={t("Offer Name")}
                            {...getFieldProps('offerName')}
                            error={Boolean(touched.offerName && errors.offerName)}
                            helperText={touched.offerName && errors.offerName}
                        />
                    </Grid>

                    <Grid item xs={5} >


                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={themeDirection == 'ltr' ? enLocale : arLocale}>
                            <DatePicker
                                mask='__/__/____'
                                label={t("Offer Start Date")}
                                value={values.offerStartDate}
                                onChange={(newValue) => {
                                    setFieldValue("offerStartDate", newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        required
                                        id="offerStartDate"
                                        fullWidth
                                        name="offerStartDate"
                                        error={Boolean(touched.offerStartDate && errors.offerStartDate)}
                                        helperText={touched.offerStartDate && errors.offerStartDate}
                                    />
                                }

                            />
                        </LocalizationProvider>

                    </Grid>

                    <Grid item xs={6} >
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={themeDirection == 'ltr' ? enLocale : arLocale}>
                            <DatePicker
                                mask='__/__/____'
                                label={t("Offer End Date")}
                                value={values.offerEndDate}
                                onChange={(newValue) => {
                                    setFieldValue("offerEndDate", newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        required
                                        fullWidth
                                        name="offerEndDate"
                                        error={Boolean(touched.offerEndDate && errors.offerEndDate)}
                                        helperText={touched.offerEndDate && errors.offerEndDate}
                                    />
                                }

                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6} >
                        <Grid container  >
                            <Grid item xs={3}>
                                <InputLabel>{t("Stock File")}</InputLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    required
                                    placeholder={t("Stock File")}
                                    type="file"
                                    id="offerFile"
                                    onChange={(event) => {
                                        setFieldValue("offerFile", event.currentTarget.files[0]);
                                    }}
                                    error={Boolean(touched.offerFile && errors.offerFile)}
                                    helperText={touched.offerFile && errors.offerFile}
                                />
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item xs={11} >
                        <TextField
                            fullWidth
                            name="notes"
                            label={t("Notes")}
                            {...getFieldProps('notes')}
                            error={Boolean(touched.notes && errors.notes)}
                            helperText={touched.notes && errors.notes}
                        />
                    </Grid>

                    <Grid item xs={9} />
                    <Grid item xs={2} >

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            pending={isSubmitting}
                        >
                            {t("Add Offer")}
                        </LoadingButton>

                    </Grid>
                </Grid> */}
            </Form>
        </FormikProvider >
    );
}

export default AddOfferForm;
