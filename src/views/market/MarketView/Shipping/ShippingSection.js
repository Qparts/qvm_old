import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import editFill from '@iconify-icons/eva/edit-fill';
import CustomButton from 'src/components/Ui/Button';
import { makeStyles } from '@material-ui/core/styles';
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
import { updateBillingAddress, updateCartItems } from 'src/redux/slices/market';
import helper from 'src/utils/helper';
import BillingAddressCard from './BillingAddressCard';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import QVMCard from 'src/components/Ui/QvmCard';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3)
    },
    center: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '20%'
    }
}));

// ----------------------------------------------------------------------

const steps = ['Billing Address', 'Payment Method', 'The request has been placed'];

function ShippingSection(props) {
    const classes = useStyles();
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
            return (
                <BillingAddressForm formik={formik} />
            );
        }
        if (activeStep === 1) {
            return (
                <>
                    <Checkout />
                    <CustomButton
                        onClick={() => handleNext()}
                    >{t("Complete the purchase")}</CustomButton>

                </>
            );
        }

        if (activeStep === 2) {
            return (
                <>
                    <Box component="img" src='/static/icons/success.svg' className={classes.center} />

                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="subtitle1" className={classes.center}> {t('The request has been successfully placed')} </Typography>
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                        <CustomButton onClick={() => {
                            history.push(PATH_APP.general.market);
                            dispatch(updateBillingAddress(null));
                            dispatch(updateCartItems([]));
                        }}>{t("Continue Shopping")}</CustomButton>
                    </Box>
                </>
            );
        }
        return;
    };


    return (
        <>
            <Box sx={{ width: '100%' }}>
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
                    <QVMCard>
                        {renderContent()}
                    </QVMCard>
                </Grid>

                <Grid item md={4} >
                    <QVMCard
                        title={t("Order Summary")}
                        action={() => history.push('/app/market/cart')}
                        actionTitle={t("Edit")}
                        icon={editFill}
                    >
                        <Box sx={{ mb: 3 }} />

                        <OrderSummary />

                        <Box sx={{ mb: 3 }} />

                        {activeStep == 0 && <CustomButton
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >{t("Complete the purchase")}</CustomButton>
                        }
                    </QVMCard>

                    {activeStep > 0 &&
                        <QVMCard
                            title={t("Billing Address")}
                            action={() => setActiveStep(0)}
                            actionTitle={t("Edit")}
                            icon={editFill}
                        >
                            <BillingAddressCard />

                        </QVMCard>
                    }
                </Grid>
            </Grid>
        </>

    );

}

export default ShippingSection;
