import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { Grid, MenuItem, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from 'src/components/Ui/Button';
import TextField from "src/components/Ui/TextField";

// ----------------------------------------------------------------------

QuotationSearchForm.propTypes = {
    formik: PropTypes.object.isRequired
};


function QuotationSearchForm({ formik }) {
    const { errors, touched, handleSubmit, getFieldProps } = formik;
    const { t } = useTranslation();
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
            if (i > 2019) currentYears.push(i);
        }
        setYears(currentYears);
    }, [])

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item md={5} sm={4} xs={6} >
                        <TextField
                            type='select'
                            name="year"
                            label={t("Year")}
                            selectBg='selectBg'
                            {...getFieldProps('year')}
                            SelectProps={{ native: true }}
                            error={Boolean(touched.year && errors.year)}
                            helperText={touched.year && errors.year}
                        >
                            {/* <option value="" /> */}
                            {years.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item md={5} sm={4} xs={6} >
                        <TextField
                            type='select'
                            name="month"
                            label={t("Month")}
                            selectBg='selectBg'
                            {...getFieldProps('month')}
                            SelectProps={{ native: true }}
                            error={Boolean(touched.month && errors.month)}
                            helperText={touched.month && errors.month}
                        >
                            <MenuItem value="" />
                            {months.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item md={2} sm={4} xs={12}>
                        <Box mt={0.5}/>
                        <Button type="submit"> {t("Create Report")} </Button>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}

export default QuotationSearchForm;
