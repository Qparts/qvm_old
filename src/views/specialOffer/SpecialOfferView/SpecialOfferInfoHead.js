import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { setSelectedOffer } from 'src/redux/slices/specialOffer';
import helper from 'src/utils/helper';
import { Calender, Location, Parts, OrdersArrow, Offer } from '../../../icons/icons';
import CustomButton from '../../../components/Ui/Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    offerDetailsHead: {
        background: theme.palette.grey[0],
        padding: '0 15px',
        borderBottom: '1px solid #E5EBF0',
        '@media (max-width: 975px)': {
            display: 'block !important',
        },
    },
    offerName: {
        color: theme.palette.secondary.darker,
        margin: theme.spacing(1, 0, 0.5),
        lineHeight: 1,
        '@media (max-width: 517px)': {
            marginBottom: theme.spacing(1),
        },
    },
    offerTime: {
        display: 'flex',
        '@media (max-width: 517px)': {
            display: 'block',
        },
    },
    offerItemInfo: {
        padding: theme.spacing(3.5, 2.5),
        textAlign: 'center',
        borderRight: '1px solid #EEF1F5',
        borderLeft: '1px solid #EEF1F5',
        lineHeight: 1,
        '@media (max-width: 975px)': {
            borderLeft: 0
        },
        '@media (max-width: 517px)': {
            borderRight: 0,
            borderBottom: '1px solid #EEF1F5',
            padding: theme.spacing(1.75, 0)
        },
    },
    offerItemInfoNum: {
        lineHeight: 1,
        marginTop: '10px',
        fontWeight: 400
    },
    offerDetailsFlex: {
        display: 'flex',
        alignItems: 'center',
        '@media (max-width: 517px)': {
            justifyContent: 'center'
        },
    },
    mainCont: {
        justifyContent: 'space-between'
    },
    secPadding: {
        padding: '20px 0',
        '@media (max-width: 975px)': {
            justifyContent: 'center'
        },
        '@media (max-width: 517px)': {
            display: 'block !important'
        },
    },
    orderOffer: {
        marginRight: '10px'
    },
    chartCont: {
        marginRight: theme.spacing(2.5),
        '@media (max-width: 517px)': {
            margin: theme.spacing(0, 0, 1.5, 0)
        },
    },
    chart: {
        '& .apexcharts-canvas': { margin: 'auto' },
    },
    textRight: {
        textAlign: 'left',
        '@media (max-width: 517px)': {
            textAlign: 'center'
        },
    },
    placeOrder: {
        '@media (max-width: 975px)': {
            justifyContent: 'center',
            borderTop: '1px solid #EEF1F5'
        },
        '@media (max-width: 517px)': {
            display: 'block'
        },
    },
    btnOrder: {
        marginLeft: '20px',
        '@media (max-width: 517px)': {
            margin: theme.spacing(1.75, 0)
        },
    }
}));

// ----------------------------------------------------------------------

export default function SpecialOfferInfo(props) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { selectedOffer, companies } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);

    const chartData = [helper.calculateTimeLeft(selectedOffer.startDate, selectedOffer.endDate)];
    const chartOptions = merge(ApexChartsOption(), {
        colors: [theme.palette.primary.main],
        chart: { sparkline: { enabled: true } },
        legend: { show: false },
        plotOptions: {
            radialBar: {
                hollow: { size: '78%' },
                track: { margin: 0 },
                dataLabels: {
                    name: { show: false },
                    value: {
                        offsetY: 6,
                        color: theme.palette.secondary.darker,
                        fontSize: theme.typography.subtitle1.fontSize
                    }
                }
            }
        }
    });

    useEffect(() => {
        if (!props.offerId) {
            dispatch(setSelectedOffer({ selectedOffer: null }));
        }
    }, []);


    return (
        <Box className={clsx(classes.offerDetailsHead, classes.offerDetailsFlex, classes.mainCont)}>
            <Box className={clsx(classes.offerDetailsFlex, classes.secPadding)}>
                <Box className={classes.chartCont}>
                    <ReactApexChart
                        type="radialBar"
                        series={chartData}
                        options={chartOptions}
                        width={86}
                        height={86}
                        className={classes.chart}
                    />
                    <Typography variant="caption" sx={{ color: '#7F929C' }}> {t('The offer time has passed')} </Typography>
                </Box>
                <Box className={classes.textRight}>
                    <Typography variant="body3" sx={{ color: theme.palette.primary.main }}>
                        {themeDirection == 'rtl' ? companies.get(selectedOffer.companyId).nameAr :
                            companies.get(selectedOffer.companyId).name}
                    </Typography>
                    <Typography variant="h5" className={classes.offerName}>
                        {themeDirection == 'rtl' ? selectedOffer.offerNameAr :
                            selectedOffer.offerName}
                    </Typography>
                    <Box className={classes.offerTime}>
                        <Box className={classes.offerDetailsFlex} sx={{ marginRight: '10px' }}>
                            <Calender width='16' height='16' fill='#7E8D99' />
                            <Typography variant="caption" sx={{ color: '#7E8D99', margin: '0 4px 0 7px' }}> {t('Start in')}</Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.secondary.main }}> {helper.toDate(selectedOffer.startDate)} </Typography>
                        </Box>
                        <Box className={classes.offerDetailsFlex}>
                            <Typography variant="caption" sx={{ color: '#7E8D99', margin: '0 4px 0 7px' }}> {t('Expires in')}</Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.secondary.main }}> {helper.toDate(selectedOffer.endDate)} </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.offerDetailsFlex} sx={{ marginTop: '7px' }}>
                        <Location width='20' height='20' fill='#7E8D99' />
                        <Typography variant="body3" sx={{ color: theme.palette.secondary.main, marginLeft: '4px' }}> {selectedOffer.offerNameAr} </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={clsx(classes.offerDetailsFlex, classes.placeOrder)}>
                <Box className={classes.offerItemInfo}>
                    <Parts width='26' height='26' fill='#7E8D99' />
                    <Typography variant="caption" sx={{ display: 'block', color: '#526C78' }}> {t("parts number")} </Typography>
                    <Typography variant="h3" className={classes.offerItemInfoNum}> 3745 </Typography>
                </Box>
                <Box className={classes.offerItemInfo} sx={{ borderLeft: '0 !important' }}>
                    <Offer width='26' height='26' fill='#7E8D99' />
                    <Typography variant="caption" sx={{ display: 'block', color: '#526C78' }}> {t("total price")} </Typography>
                    <Typography variant="h3" className={classes.offerItemInfoNum}>
                        30.000
                        <Typography variant="caption"> {t("SAR")} </Typography>
                    </Typography>
                </Box>
                <Box className={classes.btnOrder}>
                    <CustomButton>
                        <OrdersArrow width='24' height='24' fill={theme.palette.grey[0]} fillArr={theme.palette.grey[0]} className={classes.orderOffer} />
                        {t("order the offer")}
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
}