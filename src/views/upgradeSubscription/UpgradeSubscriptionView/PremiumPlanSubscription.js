import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    Box, Link, Hidden, Container,
    Typography, Alert, OutlinedInput,
    TextField
} from '@material-ui/core';
import paymentService from 'src/services/paymentService';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { GoSell } from "@tap-payments/gosell";
import { LoadingButton } from '@material-ui/lab';
import Datatable from 'src/components/table/DataTable';

import ImageUploader from 'react-images-upload';
import { InputLabel } from '@material-ui/core';
import constants from 'src/utils/constants';
import uploadService from 'src/services/uploadService';
import helper from 'src/utils/helper';
import { Redirect } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    }
}));

// ----------------------------------------------------------------------

function PremiumPlanSubscription({ planDuration }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const [receipt, setReceipt] = useState(null);

    const paymentMethods = [
        { id: 1, name: 'Bank Transfer', nameAr: 'تحويل بنكي' },
        { id: 2, name: 'Credit/Debit Card', nameAr: 'بطاقة بنكية أو إئتمانية' },
    ];

    const [banckAccounts, setBanckAccounts] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState(2);


    const { premiumPlan, loginObject } = useSelector(
        (state) => state.authJwt
    );

    const { themeDirection } = useSelector((state) => state.settings);

    const { countries } = useSelector(
        (state) => state.authJwt
    );

    const [discount, setDiscount] = useState(0);
    const [promotion, setPromotion] = useState(null);
    const [code, setCode] = useState('');

    const price = planDuration ?
        Math.round(((premiumPlan.price / 360) - (planDuration.discountPercentage * (premiumPlan.price / 360))) * planDuration.calculationDays)
        : 0;

    const planPrice = price - (promotion != null ? promotion.discountPercentage * price : 0);

    const vatAmount = planDuration ?
        planPrice * constants.VATAMOUNT : 0;

    const totalAmount = planDuration ?
        planPrice + vatAmount
        : 0;


    useEffect(() => {

        (async () => {
            const { data: bancks } = await paymentService.getBancks();
            setBanckAccounts(bancks);
        })()

    }, [])


    const handleSubmit = async ({ code }) => {
        const { data: promotionValue } = await paymentService.activePromtion(code, premiumPlan.id, planDuration.id);
        if (promotionValue) {
            setPromotion(promotionValue);
        }
    }

    const callbackFunc = (response) => {
        console.log(response);
    }

    const onAttach = async (picture) => {
        setReceipt(picture[0]);
        const formData = new FormData();
        formData.append("id", loginObject.subscriber.id);
        formData.append("file", picture[0]);
        await uploadService.uploadBanckReceipt(formData);
    }


    const submitPaymentOrder = async () => {
        let country = countries.find((e) => e.id === loginObject.company.countryId);
        const { data: payment } = await paymentService.paymentOrder(
            {
                salesType: "S",
                paymentMethod: "C",
                planId: premiumPlan.id,
                promoId: promotion ? promotion.id : 0,
                durationId: planDuration.id,
                calculationDays: planDuration.calculationDays,
                actualDays: planDuration.actualDays,
                baseAmount: price,
                planDiscount: planDuration.discountPercentage * (premiumPlan.price / 360),
                promoDiscount: promotion != null ? promotion.discountPercentage * price : 0,
                vatPercentage: .15,
                startDate: (new Date()).getTime(),
                countryId: loginObject.company.countryId,
                description: `Subscription Fees - Plan ID: ${premiumPlan.id} , Duration ID: ${planDuration.id}`,
                country: country.name,
                firstName: loginObject.subscriber.name,
                lastName: loginObject.subscriber.name,
                email: loginObject.subscriber.email,
                countryCode: country.countryCode
            })

        window.location = payment.url;
    }



    return (

        <Card >

            <CardContent className={classes.cardContent}>
                {planDuration != null &&
                    <div className="row">

                        <div className="col-md-6">
                            <Typography variant="subtitle2">{t("Subscription Price")}
                            </Typography>
                        </div>

                        <div className="col-md-6">
                            <Typography variant="subtitle2">
                                {planPrice}   {t('SAR')}
                            </Typography>
                        </div>


                        <div className="col-md-6">
                            <Typography variant="subtitle2">{t("Promotion Discount")}
                            </Typography>
                        </div>

                        <div className="col-md-6">
                            <Typography variant="subtitle2">
                                {Math.round(promotion != null ? promotion.discountPercentage * price : 0)}  {t('SAR')}
                            </Typography>
                        </div>


                        <div className="col-md-6">
                            <Typography variant="subtitle2">{t("VAT Amount")}
                            </Typography>
                        </div>

                        <div className="col-md-6">
                            <Typography variant="subtitle2">
                                {vatAmount}  {t('SAR')}
                            </Typography>
                        </div>


                        <div className="col-md-6">
                            <Typography variant="subtitle2">{t("Total Amount")}
                            </Typography>
                        </div>

                        <div className="col-md-6">
                            <Typography variant="subtitle2">
                                {totalAmount} {t('SAR')}
                            </Typography>
                        </div>

                        <Box sx={{ mb: 6 }} />

                        {promotion == null ?
                            <>
                                <TextField
                                    style={{ width: '50%', margin: 10 }}
                                    name="promotionCode"
                                    label={t("Promotion Code")}
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                    }}
                                />


                                <LoadingButton
                                    style={{ width: '40%', margin: 10 }}
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={() => handleSubmit({ code: code })}
                                >
                                    {t("Active Discount")}
                                </LoadingButton>
                            </>
                            :
                            <Typography variant="subtitle2">{t("Promotion discount applied")}  {promotion.promoCode}
                            </Typography>

                        }

                        <Box sx={{ mb: 6 }} />
                        <TextField
                            style={{ margin: 10 }}
                            select
                            fullWidth
                            label={t("Payment Method")}
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="" />
                            {paymentMethods.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {themeDirection == 'ltr' ? option.name : option.nameAr}
                                </option>
                            ))}
                        </TextField>



                        {paymentMethod == 2 &&
                            <LoadingButton
                                style={{ margin: 10 }}
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    submitPaymentOrder();
                                }}
                            >
                                {t("Checkout")}
                            </LoadingButton>
                        }

                        {paymentMethod == 1 &&
                            <>
                                <Datatable
                                    header={[
                                        {
                                            name: t("Bank"),
                                            attr: themeDirection == 'ltr' ? 'name' : 'nameAr',
                                        },
                                        {
                                            name: t("Account Number"),
                                            attr: 'account'
                                        },
                                        {
                                            name: t("IBAN"),
                                            attr: 'iban',
                                        },
                                        {
                                            name: t("Account Name"),
                                            attr: 'owner'
                                        }

                                    ]}


                                    datatable={banckAccounts}
                                    page={0}
                                    isLazy={false}
                                    hasPagination={false}

                                />
                                <Box sx={{ mb: 3 }} />

                                <ImageUploader
                                    buttonStyles={{ alignSelf: 'flex-start' }}
                                    withIcon={true}
                                    buttonText={t('Attach Transfer Receipt')}
                                    onChange={onAttach}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withIcon={false}
                                    withLabel={true}
                                    singleImage={true}
                                    labelClass="d-flex justify-content-end"
                                    label={receipt ? <InputLabel style={{ marginBottom: -40, alignSelf: 'flex-end' }}> {receipt?.name}</InputLabel> : ""}
                                />


                                <Box sx={{ mb: 3 }} />
                                <LoadingButton
                                    style={{ margin: 5 }}
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={() => console.log("paymentMethod", paymentMethod)}
                                >
                                    {t("Submit Order")}
                                </LoadingButton>
                            </>
                        }

                    </div>
                }

            </CardContent >


            <GoSell
                gateway={{
                    publicKey: "pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
                    language: "en",
                    contactInfo: true,
                    supportedCurrencies: "all",
                    supportedPaymentMethods: "all",
                    saveCardOption: true,
                    customerCards: true,
                    notifications: "standard",
                    backgroundImg: {
                        url: "imgURL",
                        opacity: "0.5",
                    },
                    callback: callbackFunc,
                    labels: {
                        cardNumber: "Card Number",
                        expirationDate: "MM/YY",
                        cvv: "CVV",
                        cardHolder: "Name on Card",
                        actionButton: "Pay",
                    },
                    style: {
                        base: {
                            color: "#535353",
                            lineHeight: "18px",
                            fontFamily: "sans-serif",
                            fontSmoothing: "antialiased",
                            fontSize: "16px",
                            "::placeholder": {
                                color: "rgba(0, 0, 0, 0.26)",
                                fontSize: "15px",
                            },
                        },
                        invalid: {
                            color: "red",
                            iconColor: "#fa755a ",
                        },
                    },
                }}
                customer={{
                    first_name: loginObject.subscriber.name,
                    email: loginObject.subscriber.email,
                    // phone: {
                    //     country_code: "965",
                    //     number: "99999999",
                    // },
                }}
                order={{
                    amount: totalAmount,
                    // amount : 100,
                    currency: "SAR",
                    shipping: null,
                    taxes: null,
                }}
                transaction={{
                    mode: "charge",
                    charge: {
                        saveCard: false,
                        threeDSecure: true,
                        description: "Test Description",
                        statement_descriptor: "Sample",
                        reference: {
                            transaction: "txn_0001",
                            order: "ord_0001",
                        },
                        metadata: {},
                        receipt: {
                            email: false,
                            sms: true,
                        },
                        redirect: "REDIRECT_URL",
                        post: null,
                    },
                }}
            />

        </Card>




    );
}

export default PremiumPlanSubscription;
