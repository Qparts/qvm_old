import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    Box, Typography, TextField
} from '@material-ui/core';
import paymentService from 'src/services/paymentService';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { LoadingButton } from '@material-ui/lab';
import Datatable from 'src/components/table/DataTable';
import { useSnackbar } from 'notistack';
import constants from 'src/utils/constants';

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

function PremiumPlanSubscription({ planDuration, setPlanDuration }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
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


    const handlePromotionSubmit = async ({ code }) => {
        const { data: promotionValue } = await paymentService.activePromtion(code, premiumPlan.id, planDuration.id);
        if (promotionValue) {
            setPromotion(promotionValue);
        }
    }


    const onAttach = async (event) => {
        console.log("file", event.target.files[0]);
        setReceipt(event.target.files[0]);
    }


    const submitPaymentOrder = async () => {
        try {
            let country = countries.find((e) => e.id === loginObject.company.countryId);
            let paymentObject = {
                salesType: "S",
                paymentMethod: paymentMethod == "1" ? "W" : "C",
                planId: premiumPlan.id,
                promoId: promotion ? promotion.id : 0,
                durationId: planDuration.id,
                calculationDays: planDuration.calculationDays,
                actualDays: planDuration.actualDays,
                baseAmount: price,
                planDiscount: Math.round(planDuration.discountPercentage),
                promoDiscount: promotion != null ? Math.round(promotion.discountPercentage) * promotion.discountPercentage * price : 0,
                vatPercentage: .15,
                startDate: (new Date()).getTime(),
                countryId: loginObject.company.countryId,
                description: `Subscription Fees - Plan ID: ${premiumPlan.id} , Duration ID: ${planDuration.id}`,
                country: country.name,
                firstName: loginObject.subscriber.name,
                lastName: loginObject.subscriber.name,
                email: loginObject.subscriber.email,
                countryCode: country.countryCode
            };

            if (paymentMethod == "1") {
                paymentObject.mimeType = receipt.type;
                paymentObject.extension = receipt.type.split('/')[1];
                const formData = new FormData();
                formData.append("paymentOrder", JSON.stringify(paymentObject));
                formData.append("file", receipt);
                await paymentService.wirePaymentOrder(formData);
                setPlanDuration(null);
                enqueueSnackbar(t('Request has been uploaded'), { variant: 'success' });
            }
            else {
                const { data: payment } = await paymentService.paymentOrder(paymentObject);
                window.locationF = payment.url;
            }
        } catch (error) {
            enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
        }
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
                                    onClick={() => handlePromotionSubmit({ code: code })}
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
                            <option value="" >
                            </option>
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

                                <input type="file" onChange={onAttach} />

                                <Box sx={{ mb: 6 }} />

                                <LoadingButton
                                    style={{ margin: 5 }}
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={!receipt}
                                    onClick={() => {
                                        submitPaymentOrder();
                                    }}
                                >
                                    {t("Submit Order")}
                                </LoadingButton>
                            </>
                        }

                    </div>
                }

            </CardContent >

        </Card>

    );
}

export default PremiumPlanSubscription;
