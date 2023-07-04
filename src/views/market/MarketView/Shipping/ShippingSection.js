import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import OrderSummary from './OrderSummary';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import BillingAddressForm from './BillingAddressForm';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Checkout from './Checkout';
import MarketActions from '../MarketUi/MarketActions';
import { updateBillingAddress, updateCartItems } from 'src/redux/slices/market';
import helper from 'src/utils/helper';
import BillingAddressCard from './BillingAddressCard';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import MainCard from 'src/components/Ui/MainCard';

// ----------------------------------------------------------------------

const steps = ['Billing Address', 'Payment Method', 'The request has been placed'];

function ShippingSection() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { billingAddress } = useSelector((state) => state.market);
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(billingAddress ? 1 : 0);
    const history = useHistory();

    const { countries } = useSelector(
        (state) => state.authJwt
    );

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const addressSchema = Yup.object().shape({
        receiver: Yup.string().required(t('Full name is required')),
        phone: Yup.string().trim().matches('^[0-9]*$', t('Phone number is not valid'))
            .length(11, t('Phone number must be 11'))
            .required(t('Phone is required')),
        address: Yup.string().required(t('Billing Address is required')),
        cityId: Yup.string().required(t('City is required')),
        regionId: Yup.string().required(t('Region is required')),
        countryId: Yup.string().required(t('Country is required'))
    });

    const formik = useFormik({
        initialValues: billingAddress ?
            {
                receiver: billingAddress.receiver,
                phone: billingAddress.phone,
                address: billingAddress.address,
                countryId: billingAddress.location.country.id,
                regionId: billingAddress.location.region.id,
                cityId: billingAddress.location.city.id,
                deliverToBranch: billingAddress.deliverToBranch
            } :
            {
                receiver: '',
                phone: '',
                address: '',
                countryId: '',
                regionId: '',
                cityId: '',
                deliverToBranch: false
            },
        validationSchema: addressSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                let location = helper.getLocation(countries, null, values.countryId, values.regionId, values.cityId)
                let address = {
                    receiver: values.receiver, phone: values.phone,
                    address: values.address, location: location,
                    deliverToBranch: values.deliverToBranch
                }
                dispatch(updateBillingAddress(address));
                handleNext();
            } catch (error) {
                console.error(error);
                setSubmitting(false);
            }
        }
    });

    const renderContent = () => {
        if (activeStep === 0) {
            return <BillingAddressForm formik={formik} />
        }
        if (activeStep === 1) {
            return <Checkout />
        }

        if (activeStep === 2) {
            return (
                <MainCard title={t("The request has been successfully placed")}>
                    <Box component="img" src='/static/icons/success.svg' sx={{ margin: 'auto', width: '20%' }} />
                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, marginTop: '20px', textAlign: 'center' }}>
                        {t('The request has been successfully placed')}
                    </Typography>
                </MainCard>
            );
        }
        return;
    };

    return (
        <>
            <Box sx={{ marginBottom: theme.spacing(3) }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{t(label)}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>

            <Grid container spacing={2}>
                <Grid item md={8} >
                    <>
                        {renderContent()}
                    </>
                </Grid>

                <Grid item md={4} >
                    <MainCard title={t("Order Summary")}>
                        <OrderSummary />
                        {activeStep == 0 &&

                            <MarketActions
                                edit
                                clickAction={() => history.push('/app/market/cart')}
                                clickCompletePur={() => { formik.handleSubmit() }} />
                        }
                    </MainCard>

                    {activeStep > 0 &&
                        <Box sx={{ mt: 2 }}>
                            <MainCard title={t("Billing Address")}>
                                <BillingAddressCard />
                                {activeStep === 2 ?
                                    <MarketActions
                                        activeStep={activeStep}
                                        clickContinueSh={() => {
                                            history.push(PATH_APP.general.market);
                                            dispatch(updateBillingAddress(null));
                                            dispatch(updateCartItems([]));
                                        }} />
                                    :
                                    <MarketActions
                                        edit
                                        clickAction={() => setActiveStep(0)}
                                        clickCompletePur={() => handleNext()} />
                                }
                            </MainCard>
                        </Box>
                    }
                </Grid>
            </Grid>
        </>

    );

}

export default ShippingSection;
