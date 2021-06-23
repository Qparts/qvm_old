import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
    TextField,
    Grid,
    InputLabel
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from "src/components/button/CustomButton";

// ----------------------------------------------------------------------

AddStockForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddStockForm({ formik }) {
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [branches, setBranches] = useState(JSON.parse(localStorage.getItem("loginObject")).company.branches)
    const { themeDirection } = useSelector((state) => state.settings);


    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={3} >
                        <TextField
                            select
                            fullWidth
                            name="branch"
                            label={t("Branch")}
                            {...getFieldProps('branch')}
                            SelectProps={{ native: true }}
                            error={Boolean(touched.branch && errors.branch)}
                            helperText={touched.branch && errors.branch}
                        >
                            <option value="" />
                            {branches.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {themeDirection == 'ltr' ? option.name : option.nameAr}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={7} >
                        <Grid container >
                            <Grid item xs={2}>
                                <InputLabel>{t("Stock File")}</InputLabel>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    placeholder={t("Stock File")}
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("stockFile", event.currentTarget.files[0]);
                                    }}
                                    error={Boolean(touched.stockFile && errors.stockFile)}
                                    helperText={touched.stockFile && errors.stockFile}
                                />
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item xs={2}>
                        <Button
                            className="round"
                            color="primary"
                            className="mx-2"
                            type="submit"
                            round
                            simple
                        >
                            {t("Upload")}
                        </Button>
                    </Grid>


                </Grid>
            </Form>
        </FormikProvider>
    );
}

export default AddStockForm;
