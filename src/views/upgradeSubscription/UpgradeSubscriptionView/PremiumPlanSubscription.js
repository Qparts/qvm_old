import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    MenuItem,
    Grid,
    ListItem,
    List,
} from '@material-ui/core';
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import paymentService from 'src/services/paymentService';
import Datatable from 'src/components/table/DataTable';
import helper from 'src/utils/helper';
import LoadingScreen from 'src/components/LoadingScreen';
import TextField from '../../../components/Ui/TextField';
import Button from '../../../components/Ui/Button';
import StockFileBtn from '../../../components/Ui/StockFileBtn';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    spaceBetweenElements: { marginBottom: theme.spacing(2) },
    activeBtn: {
        '& .css-1p5bxmy-MuiButtonBase-root-MuiButton-root': {
            padding: '9px',
            fontSize: '0.79rem',
            marginTop: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginTop: 0
            },
        }
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
        marginBottom: '20px',
        padding: 0
    },
    totalAmountChild: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px'
    },
    total: {
        borderTop: "1px solid #efefef",
        margin: theme.spacing(2, 0),
        paddingTop: theme.spacing(1),
        "& span, p": { fontWeight: 600 },
    },
    totalAmountNum: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium
    },
    plusOptionsCont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiFormControl-root': { width: 'auto' },
        '& .MuiOutlinedInput-root': {
            width: '87px',
            '@media (max-width: 430px) and (min-width: 300px)': { width: '45px' }
        },
        '& .css-g2jkac-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, & .rtl-gsvaid-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0
        },
        '& .MuiOutlinedInput-input': {
            border: 0,
            borderBottom: '1px solid #EEF1F5',
            borderRadius: 0,
            padding: 0,
            background: theme.palette.grey[0],

        }
    },
    bigMarg: { marginRight: theme.spacing(11.5) },
    MedMarg: { marginRight: theme.spacing(9.25) },
    smallMarg: { marginRight: theme.spacing(6.25) },
    overlayFullPage: {
        '& ._loading_overlay_overlay': { position: 'fixed', zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function PremiumPlanSubscription({ settings, close, addUserCheck, addBranchCheck }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { loginObject, countries, availablePlans, bancks } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);
    const [paymentMethod, setPaymentMethod] = useState(2);
    const [branchsNum, setBranchsNum] = useState(0);
    const [usersNum, setUsersNum] = useState(0);
    const [promotion, setPromotion] = useState(null);
    const [code, setCode] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [receiptFileError, setReceiptFileError] = useState(null);
    const [loaded, setLoaded] = useState(true);

    const paymentMethods = [
        { id: 1, name: 'Bank Transfer', nameAr: 'تحويل بنكي' },
        { id: 2, name: 'Credit/Debit Card', nameAr: 'بطاقة بنكية أو إئتمانية' },
    ];

    const planItems = availablePlans.filter(p => p.forever !== true)[0]?.items;
    const planStatus = loginObject.company.subscriptions.filter(e => e.status != 'F')[0].status;

    const end = loginObject.company.subscriptions[0].endDate;
    const timeleft = end - new Date().getTime();
    const days = Math.ceil(timeleft / 1000 / 60 / 60 / 24);

    const findPlanItemType = (type) => planItems.find(t => t.itemType == type);

    const branchUserNumCost = (itemType, num) => {
        if (settings && planStatus === "A")
            return (findPlanItemType(itemType).yearlyPrice / 365) * days * num
        else
            return findPlanItemType(itemType).yearlyPrice * num
    }

    const branchsNumCost = branchUserNumCost("B", branchsNum);
    const usersNumCost = branchUserNumCost("U", usersNum);
    const subtotalSetting = branchsNumCost + usersNumCost;
    const subtotalSubscription = findPlanItemType("S").yearlyPrice + branchsNumCost + usersNumCost;
    const discount = promotion != null ?
        promotion.discountPercentage * (settings ? subtotalSetting : subtotalSubscription) : 0;
    const subtotal = (settings ? subtotalSetting : subtotalSubscription) - discount;
    const vatAmount = subtotal * 0.15;
    const totalAmount = subtotal + vatAmount;

    const handlePromotionSubmit = async ({ code }) => {
        try {
            const { data: promotionValue } = await paymentService.activePromtion(code, availablePlans[1].id);
            if (promotionValue) {
                setPromotion(promotionValue);
            }
        }
        catch (error) {
            enqueueSnackbar(t('Invalid promotion code'), { variant: 'error' });
        }
    }

    const onAttach = async (event) => {
        const file = event.currentTarget.files[0];
        const extension = file.name.split(".")[1];
        if (!['jpeg', 'png', 'jpg', 'pdf'].includes(extension.toLowerCase())) {
            setReceiptFileError(t("File must be in these extensions jpeg, png, jpg, pdf"))
            setReceipt(null);
        }
        else {
            setReceiptFileError(null)
            setReceipt(file);
        }
    };

    const getQuantity = (itemType) => {
        if (itemType == "U") return Number(usersNum);
        if (itemType == "B") return Number(branchsNum);
    };

    const paymentBodyObject = (salesType, price, items, country) => {
        return {
            salesType: salesType,
            paymentMethod: paymentMethod == "1" ? "W" : "C",
            planId: availablePlans[1].id,
            promoId: promotion ? promotion.id : 0,
            promoDiscount: promotion != null ? Math.round(promotion.discountPercentage * price) : 0,
            vatPercentage: 0.15,
            startDate: new Date().getTime(),
            countryId: loginObject.company.countryId,
            firstName: loginObject.subscriber.name,
            lastName: loginObject.subscriber.name,
            email: loginObject.subscriber.email,
            countryCode: country.countryCode,
            mobile: loginObject.subscriber.mobile,
            period: "Y",
            items: items
        }
    }

    const submitPaymentOrder = async () => {
        try {
            let country = countries.find(e => e.id === loginObject.company.countryId);
            let items = [];

            for (let index in planItems) {
                const item = {
                    itemId: planItems[index].id,
                    name: planItems[index].itemName,
                    nameAr: planItems[index].itemNameAr,
                    price: planItems[index].yearlyPrice,
                    itemType: planItems[index].itemType,
                    quantity: planItems[index].mandatory ?
                        1 : getQuantity(planItems[index].itemType)
                };
                items.push(item);
            }

            const itemsToSetting = items.filter(item => (item.itemType == "U" || item.itemType == "B") && item.quantity > 0);
            const itemsToUpgrade = items.filter((item) => item.quantity > 0);

            const paymentType = settings ?
                paymentBodyObject("A", subtotalSetting, itemsToSetting, country) :
                paymentBodyObject("S", subtotalSubscription, itemsToUpgrade, country);

            setLoaded(false);
            if (paymentMethod == "1") {
                paymentType.mimeType = receipt.type;
                paymentType.extension = receipt.type.split('/')[1];
                const formData = new FormData();
                formData.append("paymentOrder", JSON.stringify(paymentType));
                formData.append("file", receipt);
                await paymentService.wirePaymentOrder(formData);
                setLoaded(true);
                enqueueSnackbar(t('Request has been uploaded'), { variant: 'success' });
                settings ? close() : history.push(PATH_APP.general.root);
            }
            else {
                const { data: payment } = await paymentService.paymentOrder(paymentType);
                window.location = payment.url;
            }

        } catch (error) {
            setLoaded(true);
            enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
        }
    }

    return (
        <LoadingOverlay
            active={!loaded}
            styles={{
                wrapper: {
                    width: "100%",
                    height: "100%",
                },
            }}
            className={classes.overlayFullPage}
            spinner={<LoadingScreen />}>

            <Box>
                {settings && (
                    <Typography variant="body1" className={classes.subscriptionsMessage}>
                        {!addUserCheck && !addBranchCheck
                            ? t(
                                "It seems that you do not have more branches or users in your plan in order to be able to create new users or create new branches, you must subscribe now"
                            )
                            : !addUserCheck
                                ? t(
                                    "It seems that you do not have more users in your plan to be able to create new users you have to subscribe now"
                                )
                                : t(
                                    "It seems that you do not have more branches in your plan to be able to create new branches, you have to subscribe now"
                                )}
                    </Typography>
                )}
                <List className={classes.totalAmount}>
                    {!settings && (
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">
                                {themeDirection === "ltr"
                                    ? findPlanItemType("S").itemName
                                    : findPlanItemType("S").itemNameAr}
                            </Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {findPlanItemType("S").yearlyPrice}{" "}
                                {t("SAR")}
                            </Typography>
                        </ListItem>
                    )}
                    {!settings && (
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">
                                {themeDirection === "ltr"
                                    ? findPlanItemType("A").itemName
                                    : findPlanItemType("A").itemNameAr}
                            </Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {findPlanItemType("A").yearlyPrice}{" "}
                                {t("SAR")}
                            </Typography>
                        </ListItem>
                    )}
                    {!settings && (
                        <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">
                                {themeDirection === "ltr"
                                    ? findPlanItemType("D").itemName
                                    : findPlanItemType("D").itemNameAr}
                            </Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {findPlanItemType("D").yearlyPrice}{" "}
                                {t("SAR")}
                            </Typography>
                        </ListItem>
                    )}
                    {/* <ListItem className={classes.totalAmountChild}>
                            <Typography variant="body3">{t("Promotion Discount")}</Typography>
                            <Typography variant="body1" className={classes.totalAmountNum}>
                                {Math.round(promotion != null ? promotion.discountPercentage * price : 0)}  {t('SAR')}
                            </Typography>
                        </ListItem> */}
                    <ListItem className={classes.totalAmountChild}>
                        <Box className={classes.plusOptionsCont}>
                            <Typography
                                variant="body3"
                                className={themeDirection == 'ltr' ? classes.smallMarg : classes.bigMarg}>
                                {t("Branches number")}
                            </Typography>
                            <TextField
                                type="input"
                                name="Number of branches"
                                value={branchsNum}
                                onChange={(e) => setBranchsNum(e.target.value)}
                            />
                        </Box>
                        <Typography variant="body1" className={classes.totalAmountNum}>
                            {helper.ccyFormat(branchsNumCost)} {t("SAR")}
                        </Typography>
                    </ListItem>
                    <ListItem className={classes.totalAmountChild}>
                        <Box className={classes.plusOptionsCont}>
                            <Typography
                                variant="body3"
                                className={themeDirection == 'ltr' ? classes.MedMarg : classes.smallMarg}>
                                {t("Users number")}
                            </Typography>
                            <TextField
                                type="input"
                                name="Users number"
                                value={usersNum}
                                onChange={(e) => setUsersNum(e.target.value)}
                            />
                        </Box>
                        <Typography variant="body1" className={classes.totalAmountNum}>
                            {helper.ccyFormat(usersNumCost)} {t("SAR")}
                        </Typography>
                    </ListItem>
                    <ListItem className={classes.totalAmountChild}>
                        <Typography variant="body3">{t("Subtotal Amount")}</Typography>
                        <Typography variant="body1" className={classes.totalAmountNum}>
                            {helper.ccyFormat(subtotal)} {t('SAR')}
                        </Typography>
                    </ListItem>
                    <ListItem className={classes.totalAmountChild}>
                        <Typography variant="body3">{t("VAT Amount")}</Typography>
                        <Typography variant="body1" className={classes.totalAmountNum}>
                            {helper.ccyFormat(vatAmount)} {t('SAR')}
                        </Typography>
                    </ListItem>
                    <ListItem className={clsx(classes.totalAmountChild, classes.total)}>
                        <Typography variant="body3">{t("Total Amount")}</Typography>
                        <Typography variant="body1" className={classes.totalAmountNum}>
                            {helper.ccyFormat(totalAmount)} {t('SAR')}
                        </Typography>
                    </ListItem>
                </List>

                {promotion == null ?
                    <Box className={clsx(classes.spaceBetweenElements, classes.activeBtn)}>
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
                                    disabled={code == '' || totalAmount == 0}
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
                                datatable={bancks}
                                page={0}
                                isLazy={false}
                                hasPagination={false}
                                dataTablePad='dataTablePad'
                                dataTableBankTrans='dataTableBankTrans'
                            />
                        </Box>
                        <Box className={classes.spaceBetweenElements}>
                            <StockFileBtn
                                onChange={onAttach}
                                title={t("Attach Transfer Receipt")}
                                value={receipt}
                                fileError={receiptFileError}
                                file='attach-transfer-receipt' />
                        </Box>
                    </>
                }
                <Button
                    disabled={paymentMethod == 1 ?
                        !receipt || receiptFileError != null || totalAmount == 0 : totalAmount == 0}
                    onClick={submitPaymentOrder}
                >
                    {paymentMethod == 1 ? t("Submit Order") : t("Checkout")}
                </Button>
            </Box>
        </LoadingOverlay>
    );
}

export default PremiumPlanSubscription;
