import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Box,
    TextField
} from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import { useTranslation } from 'react-i18next';
import StockFileBtn from '../../../../components/Ui/StockFileBtn';
import CustomInput from '../../../../components/Ui/Input';
import CustomButton from '../../../../components/Ui/Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    dateCont: {
        marginTop: '15px',
        '& label': {
            fontSize: theme.typography.body3.fontSize
        },
        '& .css-1vyotp1-MuiInputBase-root-MuiOutlinedInput-root': {
            background: '#F6F8FC',
        },
        '& input': {
            padding: '13px 14px'
        },
        '& .css-1vyotp1-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#EEF1F5',
        },
        '& .css-1vyotp1-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px'
        },
        '& fieldset': {
            borderRadius: '10px'
        }
    }
}));

// ----------------------------------------------------------------------

AddOfferForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddOfferForm({ formik }) {
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
    const { t } = useTranslation();
    const classes = useStyles();
    const [fileError, setFileError] = useState(null);

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
                        if (event.currentTarget.files[0].name.split(".")[1] != 'xlsx') {
                            setFileError(t("Stock file must be Excel File"))
                            setFieldValue("offerFile", "");

                            return;
                        }
                        setFileError(null)
                        setFieldValue("offerFile", event.currentTarget.files[0]);

                    }}
                    file='offerFile'
                    value={values.offerFile}
                    touched={touched.offerFile}
                    errors={errors.offerFile}
                    fileError={fileError} />

                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
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
                                    className={classes.dateCont}
                                    name="offerStartDate"
                                    error={Boolean(touched.offerStartDate && errors.offerStartDate)}
                                    helperText={touched.offerStartDate && errors.offerStartDate}
                                />
                            }

                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                                    className={classes.dateCont}
                                    name="offerEndDate"
                                    error={Boolean(touched.offerEndDate && errors.offerEndDate)}
                                    helperText={touched.offerEndDate && errors.offerEndDate}
                                />
                            }

                        />
                    </Grid>
                </Grid>

                <CustomInput
                    name='notes'
                    type='text'
                    label={t('Notes')}
                    spaceToTop='spaceToTop'
                    getField={getFieldProps('notes')}
                    touched={touched.notes}
                    errors={errors.notes} />

                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton type="submit">{t("upload stock")}</CustomButton>
                </Box>
            </Form>
        </FormikProvider >
    );
}

export default AddOfferForm;
