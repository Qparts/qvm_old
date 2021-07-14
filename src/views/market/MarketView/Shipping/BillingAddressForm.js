import React, { useState, useEffect } from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Divider,
    Checkbox,
    TextField,
    FormControlLabel,
    Typography,
    Box,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------


function BillingAddressForm({ formik }) {
    const classes = useStyles();
    const { countries } = useSelector((state) => state.authJwt);
    const loginObject = JSON.parse(localStorage.getItem("loginObject"));
    const defaultBranch = loginObject.company.branches.filter(e => e.id == loginObject.company.defaultBranchId)[0];
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const isRlt = themeDirection == 'rtl';
    const [countryId, setCountryId] = useState(values ? values.countryId : 0);
    const [regionId, setRegionId] = useState(values ? values.regionId : 0);
    const [cityId, setCityId] = useState(values ? values.cityId : 0);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const {
        errors,
        values,
        touched,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setFieldValue,
    } = formik;

    useEffect(() => {
        let newRegions = [];
        let newCities = [];
        if (values.countryId) {
            newRegions = countries.find((x) => x.id === parseInt(values.countryId))?.regions;
            console.log("newRegions", newRegions);
        }
        if (values.regionId) {
            newCities = newRegions.find((x) => x.id === parseInt(values.regionId))?.cities;
            console.log("newCities", newCities);
        }

        setRegions(newRegions);
        setCities(newCities);

    }, []);


    return (
        <div >
            <Typography variant="h5" >  {t("Billing Address")} </Typography>
            <Divider />
            <Box sx={{ mb: 3 }} />
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography variant="body2" >  {t("Delivery to the branch")} </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={values.deliverToBranch}
                                {...getFieldProps('deliverToBranch')}
                            />
                        }
                        label={isRlt ? defaultBranch.nameAr : defaultBranch.name}
                        sx={{ mt: 3 }}
                    />

                    <Box sx={{ mb: 3 }} />

                    <Grid container spacing={3} direction="column">


                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={t("Full Name")}
                                        {...getFieldProps('receiver')}
                                        error={Boolean(touched.receiver && errors.receiver)}
                                        helperText={touched.receiver && errors.receiver}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={t("Phone")}
                                        {...getFieldProps('phone')}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <TextField
                                fullWidth
                                label={t("Billing Address")}
                                {...getFieldProps('address')}
                                error={Boolean(touched.address && errors.address)}
                                helperText={touched.address && errors.address}
                            />
                        </Grid>

                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        label={t("Country")}
                                        id="countryId"
                                        value={countryId}
                                        name="countryId"
                                        error={Boolean(touched.countryId && errors.countryId)}
                                        helperText={touched.countryId && errors.countryId}
                                        onChange={(event) => {
                                            setFieldValue("countryId", event.target.value);
                                            setFieldValue("regionId", '');
                                            setFieldValue("cityId", '');
                                            setCountryId(event.target.value);
                                            setRegionId(0);
                                            setCityId(0);
                                            const country = countries.find((x) => x.id === parseInt(event.target.value));
                                            const newregions = country != null ? country.regions : [];
                                            setRegions(newregions);
                                            setCities([]);
                                        }}

                                        SelectProps={{ native: true }}
                                    >
                                        <option aria-label="None" value="" />
                                        {countries?.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {themeDirection == 'ltr' ? item.name : item.nameAr}
                                            </option>))
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        label={t("Region")}
                                        id="regionId"
                                        value={regionId}
                                        name="regionId"
                                        error={Boolean(touched.regionId && errors.regionId)}
                                        helperText={touched.regionId && errors.regionId}
                                        onChange={(event) => {
                                            setFieldValue("regionId", event.target.value);
                                            setFieldValue("cityId", '');
                                            setRegionId(event.target.value);
                                            setCityId(0);
                                            const newCities = regions.find((x) => x.id === parseInt(event.target.value)).cities;
                                            setCities(newCities);
                                        }}

                                        SelectProps={{ native: true }}
                                    >
                                        <option aria-label="None" value="" />
                                        {regions?.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {themeDirection == 'ltr' ? item.name : item.nameAr}
                                            </option>))
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        label={t("City")}
                                        id="cityId"
                                        value={cityId}
                                        name="cityId"
                                        error={Boolean(touched.cityId && errors.cityId)}
                                        helperText={touched.cityId && errors.cityId}
                                        onChange={(event) => {
                                            setFieldValue("cityId", event.target.value)
                                            setCityId(event.target.value);
                                        }}

                                        SelectProps={{ native: true }}
                                    >
                                        <option aria-label="None" value="" />
                                        {cities?.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {themeDirection == 'ltr' ? item.name : item.nameAr}
                                            </option>))
                                        }
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>


                </Form>
            </FormikProvider>
        </div>
    );
}

export default BillingAddressForm;