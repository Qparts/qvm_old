import { merge } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, MenuItem, Typography } from '@material-ui/core';
import TextField from '../../../components/Ui/TextField';

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
    }
}));

// ----------------------------------------------------------------------

PartsSearchRate.propTypes = {
    className: PropTypes.string
};

function PartsSearchRate({ className, ...other }) {
    const classes = useStyles();
    const { t } = useTranslation();

    const chartData = [
        { name: t('Search rate for parts'), data: [1, 3, 8, 4, 6, 9, 7, 8, 9, 9.5, 6, 7] },
    ];

    const chartOptions = merge(ApexChartsOption(), {
        xaxis: {
            categories: [
                t('Jan'),
                t('Feb'),
                t('Mar'),
                t('Apr'),
                t('May'),
                t('Jun'),
                t('Jul'),
                t('Aug'),
                t('Sep'),
                t('Oct'),
                t('Nov'),
                t('Dec')
            ]
        }
    });

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box className={classes.cardHeaderChart} >
                <Typography variant="h5"> {t("Search rate for parts in your stock")} </Typography>
                <TextField
                    type='select'
                    id='partsSearched'
                    name='partsSearched'
                    value={t("one week")}
                    datePadding='datePadding'
                    dateFilterWidth="dateFilterWidth"
                >
                    <MenuItem key={t("one week")} value={t("one week")}>
                        {t("one week")}
                    </MenuItem>
                    <MenuItem key={t("one month")} value={t("one month")}>
                        {t("one month")}
                    </MenuItem>
                    <MenuItem key={t("6 months")} value={t("6 months")}>
                        {t("6 months")}
                    </MenuItem>
                    <MenuItem key={t("one year")} value={t("one year")}>
                        {t("one year")}
                    </MenuItem>
                </TextField>
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
