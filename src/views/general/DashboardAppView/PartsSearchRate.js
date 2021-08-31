import { merge } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #E7F0F7',
        margin: '34px auto 0',
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '20px',
    },
    cardHeaderChart: {
        color: theme.palette.secondary.main,
        padding: '10px 15px',
        background: theme.palette.grey[0],
        borderBottom: '1px solid #ECF1F5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    partSearchRateHead: {
        '@media (max-width: 400px)': {
            fontSize: '0.966rem'
        },
    }
}));

// ----------------------------------------------------------------------

PartsSearchRate.propTypes = {
    className: PropTypes.string
};

function PartsSearchRate({ className, ...other }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { monthlySearchCountOnStock } = useSelector((state) => state.dashboard);
    const partSearchRateVal = monthlySearchCountOnStock.map(val => { return Math.round(val.total / 12) });
    const partSearchRateMonth = monthlySearchCountOnStock.map(val => { return t(val.month) + ' ' + val.year });

    const chartData = [
        { name: t('Search rate for parts'), data: partSearchRateVal },
    ];

    const chartOptions = merge(ApexChartsOption(), {
        xaxis: {
            categories: partSearchRateMonth
        }
    });

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box className={classes.cardHeaderChart} >
                <Typography variant="h5" className={classes.partSearchRateHead}> {t("Search rate for parts in your stock")} </Typography>
            </Box>
            <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
                <ReactApexChart
                    type="line"
                    series={chartData}
                    options={chartOptions}
                    height={364}
                />
            </Box>
        </Card>
    );
}

export default PartsSearchRate;
