import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, FormikProvider } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import {
    Grid,
    Checkbox,
    FormControlLabel,
    Typography,
    MenuItem,
    Box
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MainCard from '../../../../components/Ui/MainCard';
import TextField from '../../../../components/Ui/TextField';

// ----------------------------------------------------------------------

function BillingAddressForm({ formik }) {
    const theme = useTheme();
    const { countries } = useSelector((state) => state.authJwt);
    const loginObject = JSON.parse(localStorage.getItem("loginObject"));
    const defaultBranch = loginObject.company.branches.filter(e => e.id == loginObject.company.defaultBranchId)[0];
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const isRlt = themeDirection == 'rtl';
    const [countryId, setCountryId] = useState(values ? values.countryId : '');
    const [regionId, setRegionId] = useState(values ? values.regionId : '');
    const [cityId, setCityId] = useState(values ? values.cityId : '');
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const {
        errors,
        values,
        touched,
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
        <MainCard title={t('Billing Address')}>

            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box sx={{
                            paddingBottom: theme.spacing(1),
                            marginBottom: theme.spacing(3),
                            borderBottom: '1px solid #ECF1F5',
                    }}>
                        <Typography variant="body2" > {t("Delivery to the branch")} </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.deliverToBranch}
                                    {...getFieldProps('deliverToBranch')}
                                />
                            }
                            label={isRlt ? defaultBranch.nameAr : defaultBranch.name}
                        />
                    </Box>
                    <Grid container spacing={2} direction="column">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type='input'
                                    label={t('Full Name')}
                                    id="receiver"
                                    name="receiver"
                                    getField={getFieldProps('receiver')}
                                    touched={touched.receiver}
                                    errors={errors.receiver} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type='input'
                                    label={t('Phone')}
                                    id="phone"
                                    name="phone"
                                    getField={getFieldProps('phone')}
                                    touched={touched.phone}
                                    errors={errors.phone} />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='input'
                                label={t('Billing Address')}
                                id="address"
                                name="address"
                                getField={getFieldProps('address')}
                                touched={touched.address}
                                errors={errors.address} />
                        </Grid>

                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type='select'

                                    label={t("Country")}
                                    value={countryId}
                                    id="countryId"
                                    touched={touched.countryId}
                                    errors={errors.countryId}
                                    onChange={(event) => {
                                        setFieldValue("countryId", event.target.value);
                                        setFieldValue("regionId", '');
                                        setFieldValue("cityId", '');
                                        setCountryId(event.target.value);
                                        setRegionId('');
                                        setCityId('');
                                        const country = countries.find((x) => x.id === parseInt(event.target.value));
                                        const newregions = country != null ? country.regions : [];
                                        setRegions(newregions);
                                        setCities([]);
                                    }}
                                >
                                    <MenuItem aria-label="None" value="" />
                                    {countries?.map((item, index) => (
                                        <MenuItem value={item.id} key={index}>
                                            {themeDirection == 'ltr' ? item.name : item.nameAr}
                                        </MenuItem>))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type='select'

                                    label={t("Region")}
                                    value={regionId}
                                    id="regionId"
                                    name="regionId"
                                    touched={touched.regionId}
                                    errors={errors.regionId}
                                    onChange={(event) => {
                                        setFieldValue("regionId", event.target.value);
                                        setFieldValue("cityId", '');
                                        setRegionId(event.target.value);
                                        setCityId('');
                                        const newCities = regions.find((x) => x.id === parseInt(event.target.value)).cities;
                                        setCities(newCities);
                                    }}
                                >
                                    <MenuItem aria-label="None" value="" />
                                    {regions?.map((item, index) => (
                                        <MenuItem value={item.id} key={index}>
                                            {themeDirection == 'ltr' ? item.name : item.nameAr}
                                        </MenuItem>))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type='select'
                                    label={t("Region")}
                                    value={cityId}
                                    id="cityId"
                                    name="cityId"
                                    touched={touched.cityId}
                                    errors={errors.cityId}
                                    onChange={(event) => {
                                        setFieldValue("cityId", event.target.value)
                                        setCityId(event.target.value);
                                    }}
                                >
                                    <MenuItem aria-label="None" value="" />
                                    {cities?.map((item, index) => (
                                        <MenuItem value={item.id} key={index}>
                                            {themeDirection == 'ltr' ? item.name : item.nameAr}
                                        </MenuItem>))
                                    }
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </MainCard>
    );
}

export default BillingAddressForm;