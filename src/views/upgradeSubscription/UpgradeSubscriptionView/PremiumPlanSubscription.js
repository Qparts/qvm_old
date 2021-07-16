import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    MenuItem,
    Grid,
    ListItem,
    List,
} from '@material-ui/core';
import paymentService from 'src/services/paymentService';
import Datatable from 'src/components/table/DataTable';
import { useSnackbar } from 'notistack';
import constants from 'src/utils/constants';
import TextField from '../../../components/Ui/TextField';
import Button from '../../../components/Ui/Button';
import StockFileBtn from '../../../components/Ui/StockFileBtn';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    spaceBetweenElements: {
        marginBottom: theme.spacing(2)
    },
    PromotionDiscountSuccess: {
        backgroundColor: '#dff0d8',
        color: '#3c763d',
        padding: '15px',
        marginBottom: theme.spacing(2),
        border: '1px solid transparent',
        borderRadius: '4px',
        textAlign: 'center',
        display: 'block',
        fontWeight: theme.typography.fontWeightMedium,
    },
    totalAmount: {
        borderRadius: '10px',
        border: '1px solid #E7F0F7',
        marginBottom: '20px',
        padding: 0
    },
    totalAmountChild: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #efefef',
        '&:last-of-type': {
            border: 0,
        },
    },
    totalAmountNum: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium
    }
}));

// ----------------------------------------------------------------------

function PremiumPlanSubscription({ planDuration, setPlanDuration }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [receipt, setReceipt] = useState(null);

    const paymentMethods = [
        { id: 1, name: 'Bank Transfer', nameAr: 'تحويل بنكي' },
        { id: 2, name: 'Credit/Debit Card', nameAr: 'بطاقة بنكية أو إئتمانية' },
    ];

    const [banckAccounts, setBanckAccounts] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(2);
    const { premiumPlan, loginObject } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);
    const { countries } = useSelector((state) => state.authJwt);
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
        <>
            {planDuration != null &&
                <Box>
                    <List className={classes.totalAmount}>
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">{t("Subscription Price")}</Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {planPrice} {t('SAR')}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">{t("Promotion Discount")}</Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {Math.round(promotion != null ? promotion.discountPercentage * price : 0)}  {t('SAR')}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">{t("VAT Amount")}</Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {vatAmount} {t('SAR')}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">{t("Total Amount")}</Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {totalAmount} {t('SAR')}
                            </Typography>
                        </ListItem>
                    </List>

                    {promotion == null ?
                        <Box className={classes.spaceBetweenElements}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        type="input"
                                        name="promotionCode"
                                        label={t("Promotion Code")}
                                        value={code}
                                        onChange={(e) => { setCode(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button
                                        onClick={() => handlePromotionSubmit({ code: code })}
                                    >
                                        {t("Active Discount")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        :
                        <Typography variant="body3" className={classes.PromotionDiscountSuccess}>
                            {t("Promotion discount applied")} {promotion.promoCode}
                        </Typography>
                    }
                    <Box className={classes.spaceBetweenElements}>
                        <TextField
                            type="select"
                            label={t("Payment Method")}
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <MenuItem value=""></MenuItem>
                            {paymentMethods.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {themeDirection == 'ltr' ? option.name : option.nameAr}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {paymentMethod == 2 &&
                        <Button
                            onClick={() => submitPaymentOrder()}
                        >
                            {t("Checkout")}
                        </Button>
                    }
                    {paymentMethod == 1 &&
                        <>
                            <Box className={classes.spaceBetweenElements}>
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
                                    dataTablePad='dataTablePad'
                                />
                            </Box>
                            <Box className={classes.spaceBetweenElements}>
                                <StockFileBtn
                                    onChange={onAttach}
                                    title={t("Attach Transfer Receipt")}
                                    file='attach-transfer-receipt' />
                            </Box>

                            <Button
                                disabled={!receipt}
                                onClick={() => submitPaymentOrder()}
                            >
                                {t("Submit Order")}
                            </Button>
                        </>
                    }
                </Box>
            }
        </>
    );
}

export default PremiumPlanSubscription;
