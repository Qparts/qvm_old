import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
    TextField,
    Grid} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from "src/components/button/CustomButton";

// ----------------------------------------------------------------------

QuotationSearchForm.propTypes = {
    formik: PropTypes.object.isRequired
};



function QuotationSearchForm({ formik }) {
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { themeDirection } = useSelector((state) => state.settings);

    const [months, setMonths] = useState(
        [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ]);

    const [years, setYears] = useState([]);


    useEffect(() => {
        let date = new Date();
        const year = date.getFullYear();

        let currentYears = [];
        for (var i = year; i > year - 5; i--) {
            currentYears.push(i);
        }
        setYears(currentYears);
    }, [])



    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={5} >
                        <TextField
                            select
                            fullWidth
                            name="year"
                            label={t("Year")}
                            {...getFieldProps('year')}
                            SelectProps={{ native: true }}
                            error={Boolean(touched.year && errors.year)}
                            helperText={touched.year && errors.year}
                        >
                            {/* <option value="" /> */}
                            {years.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item xs={5} >
                        <TextField
                            select
                            fullWidth
                            name="month"
                            label={t("Month")}
                            {...getFieldProps('month')}
                            SelectProps={{ native: true }}
                            error={Boolean(touched.month && errors.month)}
                            helperText={touched.month && errors.month}
                        >
                            <option value="" />
                            {months.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
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
                            {t("Create Report")}
                        </Button>
                    </Grid>



                </Grid>
            </Form>
        </FormikProvider>
    );
}

export default QuotationSearchForm;
