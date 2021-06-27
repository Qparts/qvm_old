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
import { Calender, Location, Parts, Orders, Offer } from '../../../icons/icons';
import CustomButton from '../../../components/Ui/Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    offerDetailsHead: {
        background: theme.palette.grey[0],
        padding: '0 15px',
        borderBottom: '1px solid #E5EBF0'
    },
    offerName: {
        color: theme.palette.secondary.darker,
        margin: '7px 0 4px',
        lineHeight: 1,
    },
    offerItemInfo: {
        padding: '28px 20px',
        textAlign: 'center',
        borderRight: '1px solid #EEF1F5',
        borderLeft: '1px solid #EEF1F5',
        lineHeight: 1,
    },
    offerItemInfoNum: {
        lineHeight: 1,
        marginTop: '10px',
        fontWeight: 400,
    },
    offerDetailsFlex: {
        display: 'flex',
        alignItems: 'center',
    },
    mainCont: {
        justifyContent: 'space-between',
    },
    secPadding: {
        padding: '20px 0'
    },
    orderOffer: {
        marginRight: '10px'
    },
    chart: {
        '& .apexcharts-canvas': { margin: 'auto' },
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

    const chartData = [75];
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
                <Box sx={{ marginRight: '20px' }}>
                    <ReactApexChart
                        type="radialBar"
                        series={chartData}
                        options={chartOptions}
                        width={86}
                        height={86}
                        className={classes.chart}
                    />
                    <Typography variant="caption" sx={{color: '#7F929C'}}> {t('The offer time has passed')} </Typography>
                </Box>
                <Box>
                    <Typography variant="body3" sx={{ color: theme.palette.primary.main }}>
                        {themeDirection == 'rtl' ? companies.get(selectedOffer.companyId).nameAr :
                            companies.get(selectedOffer.companyId).name}
                    </Typography>
                    <Typography variant="h5" className={classes.offerName}>
                        {themeDirection == 'rtl' ? selectedOffer.offerNameAr :
                            selectedOffer.offerName}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
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
            <Box className={classes.offerDetailsFlex}>
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
                <Box sx={{ marginLeft: '20px' }}>
                    <CustomButton>
                        <Orders width='24' height='24' fill={theme.palette.grey[0]} fillArr={theme.palette.grey[0]} className={classes.orderOffer} />
                        {t("order the offer")}
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
}